"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tuitions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tuitions.belongsTo(models.students, {
        foreignKey: "studentId",
      });
    }
  }
  tuitions.init(
    {
      studentId: DataTypes.INTEGER,
      month: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      price: DataTypes.STRING,
      closingdate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "tuitions",
    }
  );
  return tuitions;
};
