module.exports = (sequelize, DataTypes) => {
  const Mentor = sequelize.define("Mentor", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    areaOfExpertise: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    gender: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    shortBio: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    verificationStatus: {
      type: DataTypes.ENUM,
      values: ["Approved", "Disapproved", "Pending"],
      allowNull: false,
      defaultValue: "Pending",
    },
    keyAchievements: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    yearsOfExperience: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    caseInvolvement: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    taskMethodology: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    resultsAndImprovement: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    education: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    certificationNo: {
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
      allowNull: false,
      unique: true,
    },
  });

  Mentor.associate = (model) => {
    Mentor.belongsTo(model.Category, {
      foreignKey: "categoryId",
    });

    Mentor.belongsTo(model.User, { foreignKey: "userId" });
  };

  return Mentor;
};
