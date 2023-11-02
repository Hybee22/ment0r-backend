module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["0", "1"],
      allowNull: false,
      defaultValue: "0",
    },
    block: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    profileCreated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    googleId: {
      type: DataTypes.STRING(250),
      allowNull: true,
      unique: true,
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    organizationId: {
      type: DataTypes.STRING,
    },
    signInCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    currentSignInOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    LastSignInOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    currentSignInIp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LastSignInIp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billingName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    canceledSubscriptionOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpire: DataTypes.BIGINT,
  });

  User.associate = (model) => {
    // User Association with other models
    User.hasMany(model.Role, {
      onDelete: "cascade",
    });

    User.hasMany(model.File, {
      onDelete: "cascade",
    });

    User.hasMany(model.Comment, {
      onDelete: "cascade",
    });

    User.hasMany(model.Post, {
      onDelete: "cascade",
    });

    User.hasMany(model.Activity, {
      onDelete: "cascade",
    });

    User.hasMany(model.Tracking, {
      onDelete: "cascade",
    });

    User.hasMany(model.Group, {
      onDelete: "cascade",
    });

    User.hasOne(model.Mentor, {
      onDelete: "cascade",
    });

    User.belongsTo(model.Organization);
  };

  return User;
};
