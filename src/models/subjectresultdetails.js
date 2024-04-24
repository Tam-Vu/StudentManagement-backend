"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class subjectresultdetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      subjectresultdetails.belongsTo(models.subjectresults, {
        foreignKey: "subjectresultId",
      });
    }
  }
  subjectresultdetails.init(
    {
      testturn: DataTypes.INTEGER, // lần kiểm tra
      testdate: DataTypes.DATE,
      score: DataTypes.FLOAT,
      testtype: DataTypes.INTEGER, // loại bài kiểm tra
      factor: DataTypes.FLOAT, //hệ số
      subjectresultId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "subjectresultdetails",
    }
  );
  return subjectresultdetails;
};
