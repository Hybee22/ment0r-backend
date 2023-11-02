const Joi = require("joi");
const Format = require("../index");
const validator = require("../validator");

class FileValidation {
  static validateFile(req, res, next) {
    const format = Joi.object().keys(
      {
        userId: Format.text,
        fileName: Format.text,
        fileId: Format.text,
        fileUrl: Format.text,
      },
      {}
    );
    validator(format, req.body, res, next);
  }
}

module.exports.FileValidation = FileValidation;
