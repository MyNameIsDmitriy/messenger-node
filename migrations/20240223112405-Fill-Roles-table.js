"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
      {
        roleId: 1,
        name: "viewer",
      },
      {
        roleId: 2,
        name: "admin",
      },
      {
        roleId: 3,
        name: "editor",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
