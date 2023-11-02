const model = require("../../../models/index");

const date = new Date();

const openAttributes = [
  "firstName",
  "lastName",
  "email",
  "provider",
  "phoneNumber",
  "userId",
];

const roleAttributes = ["roleId", "roleName"];
const orgAttributes = [
  "categoryId",
  "companyName",
  "description",
  "verificationStatus",
  "address",
  "photo",
  "website",
  "email",
];
const mentorAttributes = [
  "categoryId",
  "verificationStatus",
  "gender",
  "country",
  "education",
  "areaOfExpertise",
  "shortBio",
  "certificationNo",
];

module.exports = {
  getUserByEmail: async (email) => {
    return model.User.findOne({
      where: { email },
      include: [
        // { model: model.Organization, as: "Organization", where: { email } },
        { model: model.Role, as: "Roles", attributes: roleAttributes },
      ],
    });
  },
  getUsers: async () => {
    return model.User.findAll({
      include: [
        {
          model: model.Organization,
          as: "Organization",
          attributes: orgAttributes,
        },
        { model: model.Role, attributes: roleAttributes },
        { model: model.Mentor, attributes: mentorAttributes },
      ],
      attributes: openAttributes,
    });
  },
  getUserAndRoleByEmail: async (email) => {
    return model.User.findOne({
      where: { email },
      include: [{ model: "Roles" }],
    });
  },
  getUserByPhoneNumber: async (phoneNumber) => {
    return model.User.findOne({ where: { phoneNumber } });
  },
  createUser: async (data) => {
    return model.User.create(data);
  },
  updateActivityTracking: async (userInstance, ipAddress) => {
    const user = userInstance;
    return model.User.update(
      {
        signInCount: (user.signInCount += 1),
        LastSignInOn: user.currentSignInOn,
        LastSignInIp: user.currentSignInIp,
        currentSignInOn: date,
        currentSignInIp: ipAddress,
      },
      { where: { userId: user.userId } }
    );
  },
  updateUserStatus: async (email) => {
    return model.User.update({ status: "1" }, { where: { email } });
  },
  updateProfileStatus: async (userId) => {
    return model.User.update({ profileCreated: true }, { where: { userId } });
  },
  updateUser: async (clause, data) => {
    return model.User.update({ ...data }, { where: { ...clause } });
  },
  updateTalentUserData: async (data, userId) => {
    return model.User.update(data, { where: { userId } });
  },
  getUserById: async (userId) => {
    return model.User.findOne({
      where: { userId },
      attributes: openAttributes,
      include: [
        {
          model: model.Organization,
          as: "Organization",
          attributes: orgAttributes,
        },
        { model: model.Role, attributes: roleAttributes },
        { model: model.Mentor, attributes: mentorAttributes },
      ],
    });
  },
  getUserByOrganizationId: async (organizationId) => {
    return model.User.findAll({
      where: { organizationId },
      attributes: openAttributes,
      include: {
        model: model.Role,
        as: "Roles",
        attributes: ["roleId", "roleName"],
      },
    });
  },
  deleteUserById: async (userId) => {
    return model.User.destroy({ where: { userId } });
  },
  getUserByResetPasswordToken: async (resetPasswordToken) => {
    return model.User.findOne({
      where: {
        resetPasswordToken,
      },
    });
  },
  getUserAttributes: async (userId, attributes) => {
    return model.User.findOne({ where: { userId }, attributes });
  },
};
