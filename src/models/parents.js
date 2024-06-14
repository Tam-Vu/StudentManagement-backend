"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class parents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // parents.hasMany(models.students, {
      //   foreignKey: "studentId",
      // });
    }
  }
  parents.init(
    {
      studentId: DataTypes.INTEGER,
      parentname: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "parents",
    }
  );
  return parents;
};
