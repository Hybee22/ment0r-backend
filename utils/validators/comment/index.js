const Joi = require("joi");
const Format = require("../index");
const validator = require("../validator");

class CommentValidation {
  static validateComment(req, res, next) {
    const format = Joi.object().keys(
      {
        userId: Format.text,
        postId: Format.text,
        body: Format.text,
      },
      {}
    );
    validator(format, req.body, res, next);
  }
}

module.exports.CommentValidation = CommentValidation;
