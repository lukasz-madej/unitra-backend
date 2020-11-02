const aws = require('aws-sdk');
const sharp = require('sharp');

module.exports = {
  createThumbnail
}

async function createThumbnail(key) {
  const s3 = new aws.S3();

  return new Promise((resolve, reject) => {
    s3.getObject({Bucket: process.env.IMAGES_BUCKET, Key: key}, async (error, file) => {
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
        s3.putObject({ Bucket: process.env.IMAGES_BUCKET, Key: `thumb_${key}`, Body: thumbnail }, (error) => {
          if (error) {
            console.error(error);
            reject(false);
          }
          resolve(true);
        })
      })
    })
}
