import { where } from "sequelize";
import db from "../models/index";
import { FORCE } from "sequelize/lib/index-hints";
const createNewYearGrade = async (newYear) => {
  try {
    let data = await db.grades.bulkCreate([
      {
        gradename: "10",
        total: 0,
        year: newYear,
      },
      {
        gradename: "11",
        total: 0,
        year: newYear,
      },
      {
        gradename: "12",
        total: 0,
        year: newYear,
      },
    ]);
    return {
      EM: "success",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const findAllGradesByYear = async (year) => {
  try {
    const result = await db.grades.findAll({
      where: { year: year },
    });
    return {
      EM: "success",
      EC: 0,
      DT: result,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "fail to get the grade by year",
      EC: 1,
      DT: [],
    };
  }
};
const findAllYear = async () => {
  try {
    const result = await db.grades.findAll({
      attributes: ["year"],
    });
    return {
      EM: "success",
      EC: 0,
      DT: result,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Fail to get year",
      EC: 1,
      DT: [],
    };
  }
};
module.exports = {
  createNewYearGrade,
  findAllGradesByYear,
  findAllYear,
};
