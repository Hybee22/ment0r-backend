const express = require("express");
const {
  createCategory,
  getCategories,
  getCategory,
} = require("../../controllers/category");

const { authorize } = require("../../middleware/index");
const { User, Ment0r, Organization } = require("../../middleware/role");
const { CategoryValidation } = require("../../utils/validators/category/index");

const router = express.Router();
// Create Category
router.post(
  "/",
  authorize(Ment0r.superAdmin, Ment0r.regAdmin),
  CategoryValidation.validateCategory,
  createCategory
);
// Get Categories
router.get("/", getCategories);
router.get("/:categoryId", getCategory);

module.exports = { categoryRouter: router };
