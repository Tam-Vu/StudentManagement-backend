
import { where } from "sequelize";
import db, { Sequelize, sequelize } from "../models/index";
const { Op } = require("sequelize");

const getBestStudentInEachGrade = async(year) => {
    try {
      let bestStudentInGrade10 = await sequelize.query(`select a.id, a.studentname, b.gpa, c.classname from students a inner join summaries b on 
      a.id = b.studentId inner join classes c on b.classId = c.id inner join grades d on c.gradeId = d.id where
      d.gradename = "10" and d.year = :year order by b.gpa desc limit 1`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      });
      let bestStudentInGrade11 = await sequelize.query(`select a.id, a.studentname, b.gpa, c.classname from students a inner join summaries b on 
      a.id = b.studentId inner join classes c on b.classId = c.id inner join grades d on c.gradeId = d.id where
      d.gradename = "11" and d.year = :year order by b.gpa desc limit 1`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      });
      let bestStudentInGrade12 = await sequelize.query(`select a.id, a.studentname, b.gpa, c.classname from students a inner join summaries b on 
      a.id = b.studentId inner join classes c on b.classId = c.id inner join grades d on c.gradeId = d.id where
      d.gradename = "12" and d.year = :year order by b.gpa desc limit 1`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      });
      console.log(bestStudentInGrade10);
      return {
        EM: "success",
        EC: 0,
        DT: [
            bestStudentInGrade10[0],
            bestStudentInGrade11[0],
            bestStudentInGrade12[0],
        ]
      }
    } catch(e) {
      console.log(e);
      return {
        EM: "something wrong with service",
        EC: 1,
        DT: "",
      };
    }
}

const getExcellentStudentInEachGrade = async(year) => {
    try {
      let countExcellentStudentInGrade10 = await sequelize.query(`select count(a.id) as NumberHSG, d.total as NumberHSTotal, d.gradename as grade 
      from students a inner join summaries b on a.id = b.studentId inner join classes c on b.classId = c.id inner join grades d on c.gradeId = d.id 
      where d.gradename = "10" and d.year = :year and b.title = "giỏi" group by d.total, d.gradename`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      });
      let countExcellentStudentInGrade11 = await sequelize.query(`select count(a.id) as NumberHSG, d.total as NumberHSTotal, d.gradename as grade 
      from students a inner join summaries b on a.id = b.studentId inner join classes c on b.classId = c.id inner join grades d on c.gradeId = d.id 
      where d.gradename = "11" and d.year = :year and b.title = "giỏi" group by d.total, d.gradename`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      });
      let countExcellentStudentInGrade12 = await sequelize.query(`select count(a.id) as NumberHSG, d.total as NumberHSTotal, d.gradename as grade 
      from students a inner join summaries b on a.id = b.studentId inner join classes c on b.classId = c.id inner join grades d on c.gradeId = d.id 
      where d.gradename = "12" and d.year = :year and b.title = "giỏi" group by d.total, d.gradename`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      });
      return {
        EM: "success",
        EC: 0,
        DT: [
            countExcellentStudentInGrade10[0],
            countExcellentStudentInGrade11[0],
            countExcellentStudentInGrade12[0]
        ]
      }
    } catch(e) {
      console.log(e);
      return {
        EM: "something wrong with service",
        EC: 1,
        DT: "",
      };
    }
}

  module.exports = {
    getBestStudentInEachGrade,
    getExcellentStudentInEachGrade
  }