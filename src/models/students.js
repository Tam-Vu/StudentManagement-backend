"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      students.belongsTo(models.parents, {
        foreignKey: "parentId",
      });
      students.hasMany(models.historystudents, {
        foreignKey: "studentId",
      });
      students.hasMany(models.tuitions, {
        foreignKey: "studentId",
      });
      students.belongsTo(models.User, {
        foreignKey: "userId",
      });
      students.belongsTo(models.classes, {
        through: models.belongtoclasses,
        foreignKey: "studentId",
      });
    }
  }
  students.init(
    {
      studentname: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      startDate: DataTypes.DATE,
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
      classId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "students",
    }
  );
  return students;
};
