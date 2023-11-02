const model = require("../../../models/index");

module.exports = {
  getRoleByUserId: async (userId) => {
    return model.Role.findOne({
      where: { userId },
      attributes: ["roleName", "roleId"],
    });
  },
  getRolesByUserId: async (userId) => {
    return model.Role.findAll({
      where: { userId },
      attributes: ["roleName", "roleId"],
    });
  },
  createRole: async (data) => {
    return model.Role.create(data);
  },
};
