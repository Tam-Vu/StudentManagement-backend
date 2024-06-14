"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class typeinfringes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * ĐÂY LÀ BẢNG PHÂN CÔNG
     */
    static associate(models) {
      typeinfringes.hasMany(models.summariesdetails, {
        foreignKey: "typeinfringeId",
      });
    }
  }
  typeinfringes.init(
    {
        typename: DataTypes.INTEGER,
        minuspoint: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "typeinfringes",
    }
  );
  return typeinfringes;
};
