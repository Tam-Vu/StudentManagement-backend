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
      subjectresults.belongsTo(models.subjects, {
        foreignKey: "subjectId",
      });
      subjectresults.belongsTo(models.summaries, {
        foreignKey: "summaryId"
      })
    }
  }
  subjectresults.init(
    {
      averageScore: DataTypes.FLOAT,
      result: DataTypes.STRING,
      teachercomment: DataTypes.STRING,
      summaryId: DataTypes.INTEGER,
      subjectId: DataTypes.INTEGER, 
      fifteenMinExam_1: DataTypes.FLOAT,
      fifteenMinExam_2: DataTypes.FLOAT,
      fifteenMinExam_3: DataTypes.FLOAT,
      fifteenMinExam_4: DataTypes.FLOAT,
      fortyFiveMinExam_1: DataTypes.FLOAT,
      fortyFiveMinExam_2: DataTypes.FLOAT,
      finalTest: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: "subjectresults",
    }
  );
  return subjectresults;
};
