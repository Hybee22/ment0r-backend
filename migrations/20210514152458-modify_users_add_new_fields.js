"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      "Users", // table name
      "addressLine1", // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      "Users", // table name
      "addressLine2", // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      "Users", // table name
      "country", // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      "Users", // table name
      "city", // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      "Users", // table name
      "state", // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      "Users", // table name
      "postalCode", // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Users", "addressLine1");
    await queryInterface.removeColumn("Users", "addressLine2");
    await queryInterface.removeColumn("Users", "country");
    await queryInterface.removeColumn("Users", "city");
    await queryInterface.removeColumn("Users", "state");
    await queryInterface.removeColumn("Users", "postalCode");
  },
};
