const model = require("../../models");
const { v4 } = require("uuid");

const {
  getCategories,
  createCategory,
  getCategory,
} = require("../dao/db/category");
const { successResMsg, errorResMsg } = require("../../utils/libs/response");
const logger = require("../../logger").Logger;

const createACategory = async (req, res) => {
  try {
    const categoryId = v4();
    const data = { ...req.body, categoryId };

    await createCategory(data);

    const dataInfo = {
      message: "Category created successfully",
    };

    return successResMsg(res, 201, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await getCategories();

    const dataInfo = {
      message: "Categories Found",
      categories,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const getACategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await getCategory(categoryId);

    const dataInfo = {
      message: "Category Found",
      category,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

module.exports = {
  createCategory: createACategory,
  getCategories: getAllCategories,
  getCategory: getACategory,
};
