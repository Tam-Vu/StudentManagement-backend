"use strict";
const { Model } = require("sequelize");
const subjects = require("./subjects");
module.exports = (sequelize, DataTypes) => {
  class schoolreports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      schoolreports.belongsTo(models.students, {
        foreignKey: "studentId",
      });
      schoolreports.belongsTo(models.classes, {
        foreignKey: "classId",
      });
      schoolreports.hasMany(models.summaries, {
        foreignKey: "schoolreportId",
      });
    }
  }
  schoolreports.init(
    {
        concludecore: DataTypes.FLOAT,
        concludetitle: DataTypes.STRING,
        concludebehaviorpoint: DataTypes.INTEGER,
        concludediscipline: DataTypes.STRING,
        classId: DataTypes.INTEGER,
        studentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "schoolreports",
    }
  );
  return schoolreports;
};
