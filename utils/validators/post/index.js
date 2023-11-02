const Joi = require("joi");
const Format = require("../index");
const validator = require("../validator");

class PostValidation {
  static validatePost(req, res, next) {
    const format = Joi.object().keys(
      {
        userId: Format.text,
        body: Format.text,
      },
      {}
    );
    validator(format, req.body, res, next);
  }
}

module.exports.PostValidation = PostValidation;
