const express = require("express");
const {
  addComment,
  editComment,
  removeComment,
} = require("../../controllers/comment");

const { authorize } = require("../../middleware/index");
const { User, Ment0r, Organization } = require("../../middleware/role");

const { CommentValidation } = require("../../utils/validators/comment/index");

const router = express.Router();

// Add Comment
router.post("/", CommentValidation.validateComment, addComment);

// Edit & Delete Posts
router.patch("/:commentId", editComment);
router.delete("/:commentId", removeComment);

module.exports = { commentsRoute: router };
