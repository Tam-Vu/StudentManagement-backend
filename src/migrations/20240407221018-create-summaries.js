//20240407221018-create-summariesdetails
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("summaries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gpa: {
        type: Sequelize.FLOAT,
      },
      title: {
        type: Sequelize.STRING,
      },
      teachercomment: {
        type: Sequelize.STRING,
      },
      behaviorpoint: {
        type: Sequelize.INTEGER,
      },
      discipline: {
        type: Sequelize.STRING,
      },
      studentId: {
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
    await queryInterface.dropTable("summaries");
  },
};
