const express = require("express");
const {
  addPost,
  getPost,
  getUserPosts,
  editPost,
  removePost,
} = require("../../controllers/post");

const { authorize } = require("../../middleware/index");
const { User, Ment0r, Organization } = require("../../middleware/role");

const { PostValidation } = require("../../utils/validators/post/index");

const router = express.Router();

// Add Post
router.post("/", PostValidation.validatePost, addPost);

//  Get Posts
router.get("/:postId", getPost);
router.get("/:userId/all", getUserPosts);

// Edit & Delete Posts
router.patch("/:postId", editPost);
router.delete("/:postId", removePost);

module.exports = { postsRoute: router };
