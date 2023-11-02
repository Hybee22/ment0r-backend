const model = require("../../models");
const { v4 } = require("uuid");

const {
  createComment,
  updateComment,
  deleteComment,
} = require("../dao/db/comment");

const { successResMsg, errorResMsg } = require("../../utils/libs/response");
const logger = require("../../logger").Logger;

const addComment = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const commentId = v4();
    const data = {
      ...req.body,
      commentId,
      UserUserId: userId,
      PostPostId: postId,
    };

    const comment = await createComment(data);

    return successResMsg(res, 201, {
      message: "Comment added successfully",
      data: comment,
    });
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await updateComment({ commentId }, { ...req.body });

    const dataInfo = {
      message: "Comment Updated",
    };

    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const removeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await deleteComment(commentId);

    const dataInfo = {
      message: "Comment Deleted",
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

module.exports = {
  addComment,
  editComment,
  removeComment,
};
