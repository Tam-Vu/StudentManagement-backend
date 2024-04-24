"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class summaries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      summaries.hasMany(models.summariesdetails, {
        foreignKey: "summaryId",
      });
      summaries.belongsTo(models.belongtoclasses, {
        foreignKey: "belongtoclassesId",
      });
      summaries.hasMany(models.subjectresults, {
        foreignKey: "summaryId",
      });
    }
  }
  summaries.init(
    {
      gpa: DataTypes.FLOAT,
      title: DataTypes.STRING,
      teachercomment: DataTypes.STRING,
      behaviorpoint: DataTypes.INTEGER,
      discipline: DataTypes.STRING,
      studentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "summaries",
    }
  );
  return summaries;
};
