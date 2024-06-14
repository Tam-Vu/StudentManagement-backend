"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * ĐÂY LÀ BẢNG PHÂN CÔNG
     */
    static associate(models) {
      notification.belongsTo(models.classes, {
        foreignKey: "classId",
      });
    }
  }
  notification.init(
    {
        classId: DataTypes.INTEGER,
        message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "notification",
    }
  );
  return notification;
};
