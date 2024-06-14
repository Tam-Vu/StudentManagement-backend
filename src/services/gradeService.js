import { where } from "sequelize";
import db from "../models/index";
import { FORCE } from "sequelize/lib/index-hints";
import availableFunc from "../middleware/availableFunction"

globalThis.yearBegin;
const createNewYearGrade = async (newYear) => {
  try {
    await db.students.update({
      statusinyear: 0,
    }, {where: {}})

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

    await db.params.update({
      paramValue: newYear,
    }, 
    {
      where: {
        paramName: "term",
      }
    });
    await db.params.update({
      paramValue: 1,
    }, 
    {
      where: {
        paramName: "studentSlug",
      }
    });
    await db.params.update({
      paramValue: 1,
    }, 
    {
      where: {
        paramName: "typeterm",
      }
    });

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

const changeTermService = async() => {
  try {
    let term = await availableFunc.findParamsByName("typeterm");
    if(term == 1) {
      await db.params.update({
        paramValue: 2,
      }, {
        where: {
          paramName: "typeterm"
        }
      })
    }
    if(term == 2) {
      await db.params.update({
        paramValue: 1,
      }, {
        where: {
          paramName: "typeterm"
        }
      })
    }
    return {
      EM: "success",
      EC: 0,
      DT: [],
    };
  } catch(e) {
    console.log(e);
    return {
      EM: "Fail to change term",
      EC: 1,
      DT: [],
    };
  }
}

module.exports = {
  createNewYearGrade,
  findAllGradesByYear,
  findAllYear,
  changeTermService
};
