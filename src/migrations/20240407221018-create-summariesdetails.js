//20240407221018-create-teachers
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("summariesdetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      summaryId: {
        type: Sequelize.INTEGER,
      },
      violateruletype: {
        type: Sequelize.INTEGER,
      },
      violaterule: {
        type: Sequelize.STRING,
      },
      reason: {
        type: Sequelize.STRING,
      },
      negativepoint: {
        type: Sequelize.INTEGER,
      },
      violateruledate: {
        type: Sequelize.DATE,
      },
      typeinfringeId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("summariesdetails");
  },
};
