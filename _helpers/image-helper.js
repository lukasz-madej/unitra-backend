const aws = require('aws-sdk');
const sharp = require('sharp');

module.exports = {
  createThumbnail,
  removeThumbnail
}

async function createThumbnail(key, type) {
  const s3 = new aws.S3();

  return new Promise((resolve, reject) => {
    s3.getObject({ Bucket: process.env.IMAGES_BUCKET, Key: key}, async (error, file) => {
      if (error) {
        console.error(error);
        reject(false);
      }

      const thumbnail = await sharp(file.Body)
        .resize(200)
        .toBuffer()

      resolve(thumbnail);
    })
  })
    .then((thumbnail) => {
      return new Promise((resolve, reject) => {
        s3.putObject({ Bucket: process.env.IMAGES_BUCKET, Key: getThumbnailKey(key, type), Body: thumbnail }, (error) => {
          if (error) {
            console.error(error);
            reject(false);
          }
          resolve(true);
        })
      })
    })
}

async function removeThumbnail(key, type) {
  const s3 = new aws.S3();

  return new Promise((resolve, reject) => {
    s3.deleteObject({ Bucket: process.env.IMAGES_BUCKET, Key: getThumbnailKey(key, type) }, (error) => {
      if (error) {
        console.error(error);
        reject(false);
      }
      resolve(true);
    })
  })
}

function getThumbnailKey(key, type) {
  return `${type}/thumb_${key.replace(`${type}/`, '')}`
}
