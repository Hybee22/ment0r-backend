module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define("File", {
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
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });

  File.associate = (model) => {
    File.belongsTo(model.User);
  };

  return File;
};
