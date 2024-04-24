"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class assignments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * ĐÂY LÀ BẢNG PHÂN CÔNG
     */
    static associate(models) {
      assignments.belongsTo(models.teachers, {
        foreignKey: "teacherId",
      });
      assignments.belongsTo(models.classes, {
        foreignKey: "classId",
      });
    }
  }
  assignments.init(
    {
      teacherId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "assignments",
    }
  );
  return assignments;
};
