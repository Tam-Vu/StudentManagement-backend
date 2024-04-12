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
      teachers.hasOne(models.subjects, {
        foreignKey: "teacherId",
      });
      teachers.belongsToMany(models.subjects, {
        through: models.assignments,
        foreignKey: "teacherId",
      });
      teachers.belongsToMany(models.classes, {
        through: models.assignments,
        foreignKey: "teacherId",
      });
      teachers.hasOne(models.User, {
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
