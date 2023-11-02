const model = require("../../../../models/index");

const attributes = ["categoryName", "categoryId"];

module.exports = {
  getCategories: async () => {
    return model.Category.findAll({ attributes });
  },
  getCategory: async (categoryId) => {
    return model.Category.findOne({ where: { categoryId }, attributes });
  },
  createCategory: async (data) => {
    return model.Category.create(data);
  },
  updateCategory: async (data, categoryId) => {
    return model.Category.update(data, {
      where: { categoryId },
      plain: true,
    });
  },
  deleteCategory: async (data, categoryId) => {
    return model.Category.destroy(data, {
      where: { categoryId },
      force: true,
    });
  },
};
