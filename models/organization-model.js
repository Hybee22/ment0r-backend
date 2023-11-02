module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define("Organization", {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    organizationId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    verificationStatus: {
      type: DataTypes.ENUM,
      values: ["Approved", "Disapproved", "Pending", "Uploaded"],
      allowNull: false,
      defaultValue: "Pending",
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    twitter: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  });
  Organization.associate = (model) => {
    Organization.belongsTo(model.Category);
    Organization.hasMany(model.User);
  };

  return Organization;
};
