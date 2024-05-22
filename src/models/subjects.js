"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class subjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      subjects.hasMany(models.subjectresults, {
        foreignKey: "subjectId",
      });
      subjects.hasMany(models.teachers, {
        foreignKey: "subjectId",
      });
    }
  }
  subjects.init(
    {
      subjectname: DataTypes.STRING,
      fifteenMinFactor: DataTypes.INTEGER,
      fourtyFiveMinFactor: DataTypes.INTEGER,
      finalFactor: DataTypes.INTEGER,
      factor: DataTypes.INTEGER,
      minPassScore: DataTypes.FLOAT,
      isdeleted: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "subjects",
    }
  );
  return subjects;
};
