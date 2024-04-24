"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class subjectresults extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      subjectresults.hasMany(models.subjectresultdetails, {
        foreignKey: "subjectresultId",
      });
      subjectresults.belongsTo(models.subjects, {
        foreignKey: "subjectId",
      });
      subjectresults.belongsTo(models.summaries, {
        foreignKey: "subjectId",
      });
    }
  }
  subjectresults.init(
    {
      score: DataTypes.FLOAT,
      result: DataTypes.STRING,
      teachercomment: DataTypes.STRING,
      summaryId: DataTypes.INTEGER,
      subjectId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "subjectresults",
    }
  );
  return subjectresults;
};
