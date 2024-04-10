"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class historystudents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      historystudents.belongsTo(models.classes, {
        foreignKey: "studentId",
      });
    }
  }
  historystudents.init(
    {
      studentname: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      startDate: DataTypes.DATE,
      address: DataTypes.STRING,
      classId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "historystudents",
    }
  );
  return historystudents;
};
