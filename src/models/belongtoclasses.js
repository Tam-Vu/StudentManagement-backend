"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class belongtoclasses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * ĐÂY LÀ BẢNG HỌC SINH THUỘC LỚP
     */
    static associate(models) {
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
  belongtoclasses.afterCreate(async (belongtoclasses, options) => {
    await  models.summaries.create({
      belongtoclassesId:  belongtoclasses.id,
    })
  })
  return belongtoclasses;
};
