module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
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
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });

  Post.associate = (model) => {
    Post.belongsTo(model.User);

    Post.hasMany(model.Comment, {
      onDelete: "cascade",
    });
  };

  return Post;
};
