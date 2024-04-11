//20240407221018-create-assignment
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("classes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      classname: {
        type: Sequelize.STRING,
      },
      total: {
        type: Sequelize.INTEGER,
      },
      classMonitor: {
        type: Sequelize.INTEGER,
      },
      homeroomTeacher: {
        type: Sequelize.INTEGER,
      },
      grade: {
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
    await queryInterface.dropTable("classes");
  },
};
