"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class grades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      grades.hasMany(models.classes, {
        foreignKey: "gradeId",
      });
    }
  }
  grades.init(
    {
      gradename: DataTypes.STRING,
      total: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      studentslug: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "grades",
    }
  );
  return grades;
};
