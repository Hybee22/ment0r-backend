module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
    id: {
      allowNull: false,
      unique: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });

  Group.associate = (model) => {
    Group.belongsTo(model.User);
  };

  return Group;
};
