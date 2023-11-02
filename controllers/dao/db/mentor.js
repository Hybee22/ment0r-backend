const model = require("../../../models/index");

const attributes = [
  "userId",
  "email",
  "verificationStatus",
  "categoryId",
  "gender",
  "country",
  "education",
  "areaOfExpertise",
  "shortBio",
  "keyAchievements",
  "caseInvolvement",
  "taskMethodology",
  "resultsAndImprovement",
  "certificationNo",
];

module.exports = {
  getMentors: async () => {
    return model.Mentor.findAll({ attributes });
  },
  createMentor: async (data) => {
    return model.Mentor.create(data);
  },
  updateMentor: async (clause, data) => {
    return model.Mentor.update({ ...data }, { where: { ...clause } });
  },
  updateMentorData: async (data, userId) => {
    return model.Mentor.update(data, { where: { userId } });
  },
  getMentorById: async (userId) => {
    return model.Mentor.findOne({ where: { userId }, attributes });
  },
  deleteMentorById: async (userId) => {
    return model.Mentor.destroy({ where: { userId } });
  },
  getMentorAttributes: async (userId, attributes) => {
    return model.Mentor.findOne({ where: { userId }, attributes });
  },
};
