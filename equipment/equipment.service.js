const knex = require('knex') (require('../knexfile'));

const dataHelper = require('../_helpers/data_helper');
const categoriesService = require('../categories/categories.service');
const setsService = require('../sets/sets.service');

const create = async ({ name, description, productionDate, categoryId, setId, serialNumber, images }) =>
  knex('equipment')
    .insert({
      name,
      description,
      productionDate,
      categoryId,
      setId,
      serialNumber
    })
    .then(async ([id]) => {
      if (images.length) {
        await knex('images')
          .whereIn('id', images)
          .update({ parentId: id })
      }
      return Promise.resolve({ status: 201, body: await getById(id) })
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Equipment not created' })
    });

const update = async (id, { name, description, productionDate, categoryId, setId, serialNumber, images }) =>
  knex('equipment')
    .where({ id })
    .update({
      ...dataHelper.removeEmptyProperties({
        name,
        description,
        productionDate,
        categoryId,
        setId,
        serialNumber
      })
    })
    .then(async () => Promise.resolve({ status: 200, body: await getById(id) }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Equipment not found' })
    });

const remove = async ({ id }) =>
  knex('equipment')
    .where({ id })
    .del()
    .then(() => Promise.resolve({ status: 204 }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Equipment not found' })
    });

const get = async ({ id }) =>
  getById(id)
    .then(async (equipment) => {
      const { category, set } = await getEquipmentRelations(equipment);
      const { setId, categoryId, ...equipmentResponse } = equipment;

      return Promise.resolve({ status: 200, body: { ...equipmentResponse, category, set } })
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Equipment not found' })
    });

const getAll = async (query) =>
  knex('equipment')
    .select()
    .where((builder) => {
      if (query.name) {
        builder.where('name', 'like', `%${query.name}%`);
      }

      if (query.productionDateFrom && query.productionDateTo) {
        builder.whereBetween('productionDate', [
          dataHelper.getFirstSecondForYear(query.productionDateFrom),
          dataHelper.getLastSecondForYear(query.productionDateTo)
        ])
      } else if (query.productionDateFrom) {
        builder.where('productionDate', '>=', dataHelper.getFirstSecondForYear(query.productionDateFrom))
      } else if (query.productionDateTo) {
        builder.where('productionDate', '<=', dataHelper.getLastSecondForYear(query.productionDateTo))
      }

      if (query.serialNumber) {
        builder.where('serialNumber', 'like', `%${query.serialNumber}%`);
      }

      if (query.categoryId) {
        builder.where('categoryId',  query.categoryId);
      }

      if (query.setId) {
        builder.where('setId',  query.setId);
      }
    })
    .modify((builder) => {
      if (query.categoryName) {
        builder
          .join('categories', 'equipment.categoryId', 'categories.id')
          .where('categories.name', 'like', `%${query.categoryName}%`)
      }

      if (query.setName) {
        builder
          .join('sets', 'equipment.setId', 'sets.id')
          .where('sets.name', 'like', `%${query.setName}%`)
      }
    })
    .then(async (equipment) => {
      const equipmentWithRelations = await Promise.all(
        equipment.map(
          async (item) => {
            const relations = await getEquipmentRelations(item);
            const { category, set } = relations;
            const { setId, categoryId, ...equipmentResponse } = item;

            return { ...equipmentResponse, category, set };
          }
        )
      )

      const response = equipmentWithRelations.map((item) => {
        if (item.category) delete item.category.members;
        if (item.set) delete item.set.members;

        return item;
      })
      return Promise.resolve({ status: 200, body: response })
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Equipment not found' })
    });

const getById = async (id) => {
  const equipment = await knex('equipment')
    .where({id})
    .first();
  const images = await knex('images')
    .where({ parentId: id })

  return {
    ...equipment,
    images
  }
}

const getEquipmentRelations = async (equipment) => {
  const category = equipment.categoryId ?
    await categoriesService.get({ id: equipment.categoryId }).then(categoryResponse => categoryResponse.body) :
    null;
  const set = equipment.setId ?
    await setsService.get({ id: equipment.setId }).then(setResponse => setResponse.body) :
    null;

  return { category, set };
}

module.exports = {
  create,
  update,
  remove,
  get,
  getAll
};
