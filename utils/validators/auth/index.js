const Joi = require("joi");
const Format = require("../index");
const validator = require("../validator");

class UserValidation {
  static validateUser(req, res, next) {
    const format = Joi.object().keys(
      {
        firstName: Format.firstName,
        lastName: Format.lastName,
        phoneNumber: Format.phoneNo,
        email: Format.email,
        password: Format.password,
        addressLine1: Format.text,
        addressLine2: Format.text,
        country: Format.text,
        city: Format.text,
        state: Format.text,
        postalCode: Format.text,
        role: Format.text,
      },
      {}
    );
    validator(format, req.body, res, next);
  }

  static validateLogin(req, res, next) {
    const format = Joi.object().keys(
      {
        email: Format.email,
        password: Format.text,
      },
      {}
    );
    validator(format, req.body, res, next);
  }

  static resendVerificationLink(req, res, next) {
    const format = Joi.object().keys(
      {
        email: Format.email,
      },
      {}
    );
    validator(format, req.body, res, next);
  }

  static updatePassword(req, res, next) {
    const format = Joi.object().keys(
      {
        oldPassword: Format.password,
        newPassword: Format.password,
      },
      {}
    );
    validator(format, req.body, res, next);
  }

  static resetPassword(req, res, next) {
    const format = Joi.object().keys(
      {
        password: Format.password,
      },
      {}
    );
    validator(format, req.body, res, next);
  }

  static validateEmail(req, res, next) {
    const format = Joi.object().keys(
      {
        email: Format.email,
      },
      {}
    );
    validator(format, req.body, res, next);
  }
}

module.exports.UserValidation = UserValidation;
