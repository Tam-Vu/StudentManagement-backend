//20240407221018-create-subjectresults
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subjectresultdetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      testturn: {
        type: Sequelize.INTEGER,
      },
      testdate: {
        type: Sequelize.DATE,
      },
      score: {
        type: Sequelize.FLOAT,
      },
      testtype: {
        type: Sequelize.INTEGER,
      },
      factor: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("subjectresultdetails");
  },
};
