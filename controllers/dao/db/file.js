const model = require("../../../models/index");

module.exports = {
  getFileByUserId: async (userId) => {
    return model.File.findOne({
      where: { userId },
      attributes: ["fileName", "fileId", "fileUrl"],
    });
  },
  getFilesByUserId: async (userId) => {
    return model.File.findAll({
      where: { userId },
      attributes: ["fileName", "fileId", "fileUrl"],
    });
  },
  createFile: async (data) => {
    return model.File.create(data);
  },
};
