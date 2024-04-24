"use strict";
const { Model } = require("sequelize");
const { Hooks } = require("sequelize/lib/hooks");
const students = require("./students");
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      classes.belongsToMany(models.teachers, {
        through: models.assignments,
        foreignKey: "classId",
      });
      classes.belongsTo(models.grades, {
        foreignKey: "gradeId",
      });
<<<<<<< HEAD
      classes.belongsToMany(models.students, {
        through: models.belongtoclasses,
=======
      classes.hasMany(models.belongtoclasses, {
>>>>>>> 80bc6fecd6ad6d631c2f66ec2c06206079588a6f
        foreignKey: "classId",
      });
      classes.belongsTo(models.teachers, {
        foreignKey: "homeroomTeacher",
      });
    }
  }
  classes.init(
    {
      classname: DataTypes.STRING,
      total: DataTypes.INTEGER,
      homeroomTeacher: DataTypes.INTEGER,
      gradeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "classes",
    }
  );
  // classes.addHook('afterSave', 'updateTotal', (instance, Option) => {
  //   return students.count({
  //     where: {
  //       classId: instance.id,
  //       isDeleted: 0
  //     }
  //   })
  //   .then(count => {
  //     return instance.update({
  //       total: count
  //     },
  //   {
  //     transaction: Option.transaction
  //   })
  //   })
  // })
  return classes;
};
