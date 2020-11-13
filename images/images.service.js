const knex = require('knex') (require('../knexfile'));

const imageHelper = require('../_helpers/image-helper');

const upload = async ({ body, file }) => {
  const { id, type } = body;
  const { originalname, location, size, key } = file;
  const hasThumbnail = await imageHelper.createThumbnail(key, type);

  return knex('images')
    .insert({
      name: originalname,
      type,
      location,
      size,
      key,
      hasThumbnail,
      parentId: id
    })
    .then(async ([id]) => {
      return Promise.resolve({status: 201, body: await getById(id)})
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject({status: 404, message: 'Image not uploaded'})
    });
}

const get = async ({ id }) =>
  getById(id)
    .then((image) => Promise.resolve({ status: 200, body: image }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Image not found' })
    });

const getAll = async () =>
  knex('images')
    .select()
    .then((images) => Promise.resolve({ status: 200, body: images }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Images not found' })
    });

const getAllById = async ({ id, type }) =>
  knex('images')
    .select()
    .where({ id, type })
    .then((images) => Promise.resolve({ status: 200, body: images }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Images not found' })
    });

const getAllByParentId = async ({ parentId }) =>
  knex('images')
    .select()
    .where({ parentId })
    .then((images) => Promise.resolve({ status: 200, body: images }))
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Images not found' })
    });

const remove = async ({ id }) => {
  const image = await getById(id);
  await imageHelper.removeThumbnail(image.key, image.type);

  return knex('images')
    .where({ id })
    .del()
    .then((removed) =>
      removed ? Promise.resolve({status: 204}) : Promise.reject({status: 404, message: 'Category not found'})
    )
    .catch((error) => {
      console.error(error);
      return Promise.reject({ status: 404, message: 'Category not found' })
    });
  }

const getById = async (id) =>
  knex('images').where({ id }).first();

module.exports = {
  upload,
  get,
  getAll,
  getAllById,
  getAllByParentId,
  remove
};
