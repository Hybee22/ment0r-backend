const model = require("../../../models/index");
// const { getActivities } = require('./activity');

const attributes = [
  "organizationId",
  "categoryId",
  "companyName",
  "description",
  "verificationStatus",
  "address",
  "photo",
  "website",
  "facebook",
  "twitter",
  "linkedin",
  "instagram",
  "email",
  "userId",
];

module.exports = {
  createOrganization: async (data) => {
    return model.Organization.create(data);
  },
  getOrganizationByUserId: async (userId) => {
    return model.Organization.findOne({
      where: { userId },
      attributes,
    });
  },
  getOrganizationById: async (organizationId) => {
    return model.Organization.findOne({
      where: { organizationId },
      attributes,
      include: {
        model: model.Category,
        as: "Category",
        attributes: ["categoryId", "categoryName"],
      },
    });
  },
  getOrganizations: async () => {
    return model.Organization.findAll({
      attributes,
      include: {
        model: model.Category,
        as: "Category",
        attributes: ["categoryId", "categoryName"],
      },
    });
  },
  getOrganizationByEmail: async (email) => {
    return model.Organization.findOne({ where: { email } });
  },
  updateOrganization: async (clause, data) => {
    return model.Organization.update({ ...data }, { where: { ...clause } });
  },
  getOrganizationAttributes: async (userId, attributes) => {
    return model.Organization.findOne({
      where: { userId },
      attributes,
      include: {
        model: model.Category,
        as: "Category",
        attributes: ["categoryId", "categoryName"],
      },
    });
  },
};
