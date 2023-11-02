module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    id: {
      allowNull: false,
      unique: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });

  Comment.associate = (model) => {
    Comment.belongsTo(model.Post);

    Comment.belongsTo(model.User, {
      onDelete: "cascade",
    });
  };

  return Comment;
};
