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
      students.hasOne(models.classes, {
        foreignKey: "classMonitor",
      });
      students.belongsToMany(models.teachers, {
        through: models.assignments,
        foreignKey: "subjectId",
      });
      students.belongsToMany(models.classes, {
        through: models.assignments,
        foreignKey: "subjectId",
      });
      students.belongsTo(models.classes, {
        foreignKey: "classId",
      });
      students.belongsTo(models.parents, {
        foreignKey: "parentId",
      });
      students.hasMany(models.historystudents, {
        foreignKey: "studentId",
      });
      students.hasMany(models.tuitions, {
        foreignKey: "studentId",
      });
      students.hasOne(models.summaries, {
        foreignKey: "studentId",
      });
      students.belongsTo(models.User, {
        foreignKey: "userId",
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
      parentId: DataTypes.INTEGER,
      tuitionId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "students",
    }
  );
  return students;
};
