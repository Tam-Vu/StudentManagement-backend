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
      testturn: DataTypes.INTEGER,
      testdate: DataTypes.DATE,
      score: DataTypes.FLOAT,
      testtype: DataTypes.INTEGER,
      factor: DataTypes.FLOAT,
      subjectresultId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "subjectresultdetails",
    }
  );
  return subjectresultdetails;
};
