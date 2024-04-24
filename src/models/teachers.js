"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class teachers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      teachers.belongsTo(models.subjects, {
        foreignKey: "subjectId",
      });
      teachers.belongsTo(models.assignments, {
        foreignKey: "teacherId",
      });
      teachers.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  teachers.init(
    {
      teachername: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      startDate: DataTypes.DATE,
      gender: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "teachers",
    }
  );
  return teachers;
};
