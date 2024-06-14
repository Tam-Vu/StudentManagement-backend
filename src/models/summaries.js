"use strict";
const { Model } = require("sequelize");
const subjects = require("./subjects");
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
      summaries.hasMany(models.subjectresults, {
        foreignKey: "summaryId",
      });
      summaries.belongsTo(models.schoolreports, {
        foreignKey: "schoolreportId",
      });
    }
  }
  summaries.init(
    {
      gpa: DataTypes.FLOAT,
      title: DataTypes.STRING,
      behaviorpoint: DataTypes.INTEGER,
      discipline: DataTypes.STRING,
      term: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "summaries",
    }
  );
  return summaries;
};
