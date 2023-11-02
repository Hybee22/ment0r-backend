module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
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
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });

  Role.associate = (model) => {
    Role.belongsTo(model.User);
  };

  return Role;
};
