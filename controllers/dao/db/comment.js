const model = require("../../../models/index");
// const { getActivities } = require('./activity');

const attributes = ["userId", "postId", "body", "commentId"];

module.exports = {
  createComment: async (data) => {
    return model.Comment.create(data);
  },

  getCommentById: async (commentId) => {
    return model.Comment.findOne({
      where: { commentId },
      attributes,
    });
  },

  getPostComments: async (postId) => {
    return model.Comment.findAll({
      where: { postId },
      attributes,
    });
  },

  updateComment: async (clause, data) => {
    return model.Comment.update({ ...data }, { where: { ...clause } });
  },

  deleteComment: async (commentId) => {
    return model.Comment.destroy({ where: { commentId } });
  },
};
