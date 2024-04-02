"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserRoles", {
      userId: {
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "Users", key: "userId" },
      },
      roleId: {
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "Roles", key: "roleId" },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserRoles");
  },
};
