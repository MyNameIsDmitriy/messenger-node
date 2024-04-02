"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Publications", {
      publicationId: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      userId: {
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "Users", key: "userId" },
      },
      isDraft: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
      content: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      publishedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Publications");
  },
};
