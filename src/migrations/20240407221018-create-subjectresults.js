//20240407221018-create-subjects
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subjectresults", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      score: {
        type: Sequelize.FLOAT,
      },
      result: {
        type: Sequelize.STRING,
      },
      teachercomment: {
        type: Sequelize.STRING,
      },
      summaryId: {
        type: Sequelize.INTEGER,
      },
      subjectId: {
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
    await queryInterface.dropTable("subjectresults");
  },
};
