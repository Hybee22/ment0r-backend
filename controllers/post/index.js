const model = require("../../models");
const { v4 } = require("uuid");

const {
  deletePost,
  getPostById,
  getPostByUserId,
  createPost,
  updatePost,
} = require("../dao/db/post");

const { successResMsg, errorResMsg } = require("../../utils/libs/response");
const logger = require("../../logger").Logger;

const addPost = async (req, res) => {
  try {
    const { userId } = req.body;
    const postId = v4();
    const data = { ...req.body, postId, UserUserId: userId };

    const post = await createPost(data);

    return successResMsg(res, 201, {
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await getPostByUserId(userId);

    const dataInfo = {
      message: "Posts Found",
      posts,
    };

    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await getPostById(postId);

    const dataInfo = {
      message: "Posts Found",
      post,
    };

    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const data = req.body;
    const post = await updatePost({ postId }, data);

    const dataInfo = {
      message: "Post Updated",
      post,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const removePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await deletePost(postId);

    const dataInfo = {
      message: "Post Deleted",
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

module.exports = {
  addPost,
  getPost,
  getUserPosts,
  editPost,
  removePost,
};
