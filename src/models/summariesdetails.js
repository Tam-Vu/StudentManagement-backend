"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class summariesdetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      summariesdetails.belongsTo(models.summaries, {
        foreignKey: "summaryId",
      });
    }
  }
  summariesdetails.init(
    {
      summaryId: DataTypes.INTEGER,
      violateruletype: DataTypes.INTEGER,
      violaterule: DataTypes.STRING,
      reason: DataTypes.STRING,
      negativepoint: DataTypes.INTEGER,
      violateruledate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "summariesdetails",
    }
  );
  return summariesdetails;
};
