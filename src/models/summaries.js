"use strict";
const { Model } = require("sequelize");
const subjects = require("./subjects");
module.exports = (sequelize, DataTypes) => {
  class summaries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      summaries.hasMany(models.summariesdetails, {
        foreignKey: "summaryId",
      });

      summaries.hasMany(models.subjectresults, {
        foreignKey: "summaryId",
      });

      summaries.belongsTo(models.students, {
        foreignKey: "studentId",
      });
      summaries.belongsTo(models.classes, {
        foreignKey: "classId",
      });
    }
  }
  summaries.init(
    {
      gpa: DataTypes.FLOAT,
      title: DataTypes.STRING,
      teachercomment: DataTypes.STRING,
      behaviorpoint: DataTypes.INTEGER,
      discipline: DataTypes.STRING,
      classId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "summaries",
    }
  );
  // summaries.afterCreate(async (summaries, options) => {
  //   await summariesdetails.create({
  //     summaryId: summaries.id,
  //   });

  //   const subjectTemp = await subjects.findAll({
  //     attributes: [id],
  //     group: [id],
  //   });
  //   for (subjectTemp of subjects) {
  //     await subjectresults.create([
  //       {
  //         summaryId: summaries.id,
  //         subjectId: subjectId.getDataValue("id"),
  //       },
  //     ]);
  //   }
  // });
  return summaries;
};
