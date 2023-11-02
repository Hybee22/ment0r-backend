const Joi = require("joi");
const Format = require("../index");
const validator = require("../validator");

class MentorValidation {
  static validateMentor(req, res, next) {
    const format = Joi.object().keys(
      {
        userId: Format.text,
        email: Format.email,
        categoryId: Format.text,
        gender: Format.text,
        country: Format.text,
        education: Format.text,
        areaOfExpertise: Format.text,
        shortBio: Format.text,
        keyAchievements: Format.text,
        caseInvolvement: Format.text,
        taskMethodology: Format.text,
        resultsAndImprovement: Format.text,
        certificationNo: Format.text,
      },
      {}
    );
    validator(format, req.body, res, next);
  }
}

module.exports.MentorValidation = MentorValidation;
