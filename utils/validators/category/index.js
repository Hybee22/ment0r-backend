const Joi = require("joi");
const Format = require("../index");
const validator = require("../validator");

class CategoryValidation {
  static validateCategory(req, res, next) {
    const format = Joi.object().keys(
      {
        categoryName: Format.text,
      },
      {}
    );
    validator(format, req.body, res, next);
  }
}

module.exports.CategoryValidation = CategoryValidation;
