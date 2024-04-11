"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      classes.belongsToMany(models.teachers, {
        through: models.assignments,
        foreignKey: "classId",
      });
      classes.belongsTo(models.grades, {
        foreignKey: "gradeId",
      });
      classes.belongsTo(models.students, {
        foreignKey: "subjectId",
      });
      classes.hasMany(models.students, {
        foreignKey: "classId",
      });
    }
  }
  classes.init(
    {
      classname: DataTypes.STRING,
      total: DataTypes.INTEGER,
      classMonitor: DataTypes.INTEGER,
      homeroomTeacher: DataTypes.INTEGER,
      gradeId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "classes",
    }
  );
  return classes;
};