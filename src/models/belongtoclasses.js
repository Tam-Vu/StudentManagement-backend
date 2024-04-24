"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class belongtoclasses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      belongtoclasses.belongsTo(models.students, {
        foreignKey: "studentId",
      });
      belongtoclasses.belongsTo(models.classes, {
        foreignKey: "classId",
      });
      belongtoclasses.hasOne(models.summaries, {
        foreignKey: "belongtoclassesId",
      });
    }
  }
  belongtoclasses.init(
    {
      studentId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "belongtoclasses",
    }
  );
  return belongtoclasses;
};
