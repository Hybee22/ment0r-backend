const express = require("express");
// const multer = require("multer");
const {
  uploadImageFile,
  getUserFiles,
  uploadDocumentFile,
} = require("../../controllers/file");
// const {
//   createCategory,
//   getCategories,
//   getCategory,
// } = require("../../controllers/category");

const { uploadS3 } = require("../../utils/libs/upload-file");

const { authorize } = require("../../middleware/index");
const { User, Ment0r, Organization } = require("../../middleware/role");
// const { FileValidation } = require("../../utils/validators/file/index");

const router = express.Router();
const singleImageUpload = uploadS3.single("image");
const singleDocumentUpload = uploadS3.single("document");
// Upload Image
router.post("/image/upload", singleImageUpload, uploadImageFile);
router.post("/document/upload", singleDocumentUpload, uploadDocumentFile);

// Get Files
router.get("/user/:userId", getUserFiles);

module.exports = { fileRouter: router };
