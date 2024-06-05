//20240407221018-create-schoolreportdetails
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("schoolreports", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      concludecore: {
        type: Sequelize.FLOAT,
      },
      concludetitle: {
        type: Sequelize.STRING,
      },
      concludebehaviorpoint: {
        type: Sequelize.INTEGER,
      },
      concludediscipline: {
        type: Sequelize.STRING,
      },
      studentId: {
        type: Sequelize.INTEGER,
      },
      classId: {
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
    await queryInterface.dropTable("schoolreports");
  },
};
