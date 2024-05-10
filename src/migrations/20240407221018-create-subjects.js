//20240407221018-create-summaries
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subjects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subjectname: {
        type: Sequelize.STRING,
      },
      finalFactor: {
        type: Sequelize.INTEGER,
      },
      fourtyFiveMinFactor: {
        type: Sequelize.INTEGER,
      },
      fifteenMinFactor: {
        type: Sequelize.INTEGER,
      },
      factor: {
        type: Sequelize.INTEGER,
      },
      isdeleted: {
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
    await queryInterface.dropTable("subjects");
  },
};
