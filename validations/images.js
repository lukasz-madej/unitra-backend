const baseJoi = require('joi');
const imageExtension = require('joi-image-extension');

const joi = baseJoi.extend(imageExtension);

const upload = {
  body: {
    id: joi.number(),
    type: joi
      .string()
      .valid('equipment', 'set')
      .required()
  },
  file: joi.image().required(),
}

const pathId = {
  params: {
    id: joi.number().required()
  }
};

const pathIdAndType = {
  params: {
    id: joi.number().required(),
    type: joi
      .string()
      .valid('equipment', 'set')
      .required()
  }
};

module.exports = {
  upload,
  pathId,
  pathIdAndType
};
