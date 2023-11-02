const Joi = require("joi");
const Format = require("../index");
const validator = require("../validator");

class OrganizationValidation {
  static validateOrganization(req, res, next) {
    const format = Joi.object().keys(
      {
        firstName: Format.firstName,
        lastName: Format.lastName,
        phoneNumber: Format.phoneNo,
        email: Format.email,
        password: Format.password,
        companyName: Format.text,
        categoryName: Format.textOptional,
        categoryId: Format.textOptional,
        address: Format.text,
      },
      {}
    );
    validator(format, req.body, res, next);
  }
  static validateAddUser(req, res, next) {
    const format = Joi.object().keys(
      {
        userId: Format.text,
        organizationId: Format.text,
      },
      {}
    );
    validator(format, req.body, res, next);
  }
}

module.exports.OrganizationValidation = OrganizationValidation;
