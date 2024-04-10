"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class subjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      subjects.belongsTo(models.teachers, {
        foreignKey: "teacherId",
      });
      subjects.belongsToMany(models.teachers, {
        through: models.assignments,
        foreignKey: "subjectId",
      });
      subjects.belongsToMany(models.summaries, {
        through: models.subjectresults,
        foreignKey: "subjectId",
      });
      subjects.hasOne(models.subjectresults, {
        foreignKey: "subjectId",
      });
    }
  }
  subjects.init(
    {
      subjectname: DataTypes.STRING,
      factor: DataTypes.FLOAT,
      teacherId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "subjects",
    }
  );
  return subjects;
};
