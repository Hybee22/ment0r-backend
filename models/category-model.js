module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      allowNull: false,
      unique: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Category.associate = (model) => {
    Category.hasMany(model.Organization, {
      onDelete: "cascade",
    });
  };

  return Category;
};
