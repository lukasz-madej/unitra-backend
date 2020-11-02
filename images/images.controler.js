const express = require('express');
const validate = require('express-validation');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const imagesService = require('./images.service');
const imagesValidations = require('../validations/images');

const router = express.Router();
const s3 = new aws.S3();
const uploader = multer({
  storage: multerS3({
    s3,
    bucket: process.env.IMAGES_BUCKET,
    key: (request, file, callback) => {
      callback(null, `${Date.now().toString()}_${file.originalname}`)
    }
  })
})

const get = async (request, response, next) => {
  imagesService.get(request.params)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const getAllById = async (request, response, next) => {
  imagesService.getAllById(request.params)
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

const upload = async (request, response, next) => {
  imagesService.upload({ body: request.body, file: request.file })
    .then(result => response.status(result.status).json(result.body))
    .catch(error => response.status(error.status).json(error));
}

module.exports = router;

router.get('/:id', validate(imagesValidations.pathId), get);
router.get('/:type/:id', validate(imagesValidations.pathIdAndType), getAllById);
router.post('/upload', [uploader.single('file'), validate(imagesValidations.upload)], upload);
