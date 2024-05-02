"use strict";
const { Model } = require("sequelize");
const students = require("./students");
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      classes.hasMany(models.assignments, {
        foreignKey: "classId",
      });
      classes.belongsTo(models.grades, {
        foreignKey: "gradeId",
      });
      classes.hasMany(models.summaries, {
        foreignKey: "classId",
      });
      classes.belongsTo(models.teachers, {
        foreignKey: "homeroomTeacher",
      });
    }
  }
  classes.init(
    {
      classname: DataTypes.STRING,
      total: DataTypes.INTEGER,
      homeroomTeacher: DataTypes.INTEGER,
      gradeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "classes",
    }
  );
  return classes;
};
