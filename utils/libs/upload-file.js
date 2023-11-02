const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const shortid = require("shortid");
const { successResMsg, errorResMsg } = require("./response");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_DEFAULT_REGION;

const s3 = new AWS.S3();

AWS.config.update({
  secretAccessKey,
  accessKeyId,
  region,
});

exports.uploadS3 = multer({
  limits: {
    files: 1, // allow only 1 file per request
    fileSize: 1024 * 1024 * 5, // 5 MB (max file size)
  },
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: process.env.AWS_ACCESS_LEVEL,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  }),
});
