const model = require("../../../models/index");
// const { getActivities } = require('./activity');

const attributes = ["userId", "postId", "body"];

module.exports = {
  createPost: async (data) => {
    return model.Post.create(data);
  },
  getPostByUserId: async (userId) => {
    return model.Post.findAll({
      where: { userId },
      attributes,
      include: {
        model: model.Comment,
        as: "Comments",
        attributes: ["commentId", "postId", "body", "userId"],
        include: {
          model: model.User,
          as: "User",
          attributes: ["userId", "firstName", "lastName"],
        },
      },
    });
  },

  getPostById: async (postId) => {
    return model.Post.findOne({
      where: { postId },
      attributes,
      include: {
        model: model.Comment,
        as: "Comments",
        attributes: ["commentId", "postId", "body", "userId"],
        include: {
          model: model.User,
          as: "User",
          attributes: ["userId", "firstName", "lastName"],
        },
      },
    });
  },

  getPosts: async () => {
    return model.Post.findAll({
      attributes,
      include: {
        model: model.Comments,
        as: "Comments",
        attributes: ["commentId", "postId", "body", "userId"],
        include: {
          model: model.User,
          as: "User",
          attributes: ["userId", "firstName", "lastName"],
        },
      },
    });
  },

  updatePost: async (clause, data) => {
    return model.Post.update({ ...data }, { where: { ...clause } });
  },

  deletePost: async (postId) => {
    return model.Post.destroy({ where: { postId } });
  },
};
