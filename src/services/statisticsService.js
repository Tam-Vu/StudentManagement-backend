
import { where } from "sequelize";
import db, { Sequelize, sequelize } from "../models/index";
const { Op } = require("sequelize");

const getBestStudentInEachGrade = async(year) => {
    try {
      let bestStudentInGrade10 = await sequelize.query(`select a.id, a.studentname, b.gpa, c.classname from students a inner join summaries b on 
      a.id = b.studentId inner join classes c on b.classId = c.id inner join grades d on c.gradeId = d.id where
      d.gradename = "10" and d.year = :year order by b.gpa desc limit 10`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      });
      let bestStudentInGrade11 = await sequelize.query(`select a.id, a.studentname, b.gpa, c.classname from students a inner join summaries b on 
      a.id = b.studentId inner join classes c on b.classId = c.id inner join grades d on c.gradeId = d.id where
      d.gradename = "11" and d.year = :year order by b.gpa desc limit 10`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      });
      let bestStudentInGrade12 = await sequelize.query(`select a.id, a.studentname, b.gpa, c.classname from students a inner join summaries b on 
      a.id = b.studentId inner join classes c on b.classId = c.id inner join grades d on c.gradeId = d.id where
      d.gradename = "12" and d.year = :year order by b.gpa desc limit 10`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      });
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
      let countExcellentStudentInGrade10 = await sequelize.query(`
      SELECT count(summaries.studentId) as NumberHSG, grades.total as NumberHSTotal, grades.gradename as grade
      FROM summaries 
      JOIN classes ON summaries.classId = classes.id 
      JOIN grades ON classes.gradeId = grades.id 
      WHERE grades.gradename = '10' AND summaries.title = 'giỏi'
      GROUP BY grades.total, grades.gradename
      `, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      });
      let countExcellentStudentInGrade11 = await sequelize.query(`
      SELECT count(summaries.studentId) as NumberHSG, grades.total as NumberHSTotal, grades.gradename as grade
      FROM summaries 
      JOIN classes ON summaries.classId = classes.id 
      JOIN grades ON classes.gradeId = grades.id 
      WHERE grades.gradename = '11' AND summaries.title = 'giỏi'
      GROUP BY grades.total, grades.gradename
      `, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      });
      let countExcellentStudentInGrade12 = await sequelize.query(`
      SELECT COALESCE(COUNT(summaries.studentId), 0) AS NumberHSG, grades.total AS NumberHSTotal, grades.gradename AS grade
      FROM grades 
      LEFT JOIN classes ON grades.id = classes.gradeId 
      LEFT JOIN summaries ON classes.id = summaries.classId 
      AND summaries.title = 'giỏi'
      WHERE grades.gradename = '12'
      GROUP BY 
      grades.total, grades.gradename;
      `, {
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

const compareNumOfStudentInTwoYears = async(year) => {
  try {
    let lastyear = year - 1;
    let lastlastyear = lastyear - 1;
    let NumOfStudentByTitleInThisYear = await sequelize.query(`
    SELECT 
    SUM(CASE WHEN title = 'giỏi' THEN 1 ELSE 0 END) AS NumberHSG,
    SUM(CASE WHEN title = 'khá' THEN 1 ELSE 0 END) AS NumberHSK,
    SUM(CASE WHEN title = 'trung bình' THEN 1 ELSE 0 END) AS NumberHSTB,
    SUM(CASE WHEN title = 'yếu' THEN 1 ELSE 0 END) AS NumberHSY
    FROM summaries 
    JOIN classes ON summaries.classId = classes.id 
    JOIN grades ON classes.gradeId = grades.id 
    WHERE grades.year = :year;
      `, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      });

      let NumOfStudentByTitleInLastYear = await sequelize.query(`
      SELECT 
      SUM(CASE WHEN title = 'giỏi' THEN 1 ELSE 0 END) AS NumberHSG,
      SUM(CASE WHEN title = 'khá' THEN 1 ELSE 0 END) AS NumberHSK,
      SUM(CASE WHEN title = 'trung bình' THEN 1 ELSE 0 END) AS NumberHSTB,
      SUM(CASE WHEN title = 'yếu' THEN 1 ELSE 0 END) AS NumberHSY
      FROM summaries 
      JOIN classes ON summaries.classId = classes.id 
      JOIN grades ON classes.gradeId = grades.id 
      WHERE grades.year = :lastyear;
      `, {
        replacements:{lastyear},
        type: sequelize.QueryTypes.SELECT
      });
      let NumOfStudentByTitleInLastLastYear = await sequelize.query(`
      SELECT 
      SUM(CASE WHEN title = 'giỏi' THEN 1 ELSE 0 END) AS NumberHSG,
      SUM(CASE WHEN title = 'khá' THEN 1 ELSE 0 END) AS NumberHSK,
      SUM(CASE WHEN title = 'trung bình' THEN 1 ELSE 0 END) AS NumberHSTB,
      SUM(CASE WHEN title = 'yếu' THEN 1 ELSE 0 END) AS NumberHSY
      FROM summaries 
      JOIN classes ON summaries.classId = classes.id 
      JOIN grades ON classes.gradeId = grades.id 
      WHERE grades.year = :lastlastyear;
      `, {
        replacements:{lastlastyear},
        type: sequelize.QueryTypes.SELECT
      });
      return {
        EM: "success",
        EC: 0,
        DT: [
          {
            NumberHSG: NumOfStudentByTitleInThisYear[0].NumberHSG,
            NumberHSK: NumOfStudentByTitleInThisYear[0].NumberHSK,
            NumberHSTB: NumOfStudentByTitleInThisYear[0].NumberHSTB,
            NumberHSY: NumOfStudentByTitleInThisYear[0].NumberHSY,
            Year: year,
          },
          {
            NumberHSG: NumOfStudentByTitleInLastYear[0].NumberHSG,
            NumberHSK: NumOfStudentByTitleInLastYear[0].NumberHSK,
            NumberHSTB: NumOfStudentByTitleInLastYear[0].NumberHSTB,
            NumberHSY: NumOfStudentByTitleInLastYear[0].NumberHSY,
            Year: lastyear,
          },
          {
            NumberHSG: NumOfStudentByTitleInLastLastYear[0].NumberHSG,
            NumberHSK: NumOfStudentByTitleInLastLastYear[0].NumberHSK,
            NumberHSTB: NumOfStudentByTitleInLastLastYear[0].NumberHSTB,
            NumberHSY: NumOfStudentByTitleInLastLastYear[0].NumberHSY,
            Year: lastlastyear,
          },
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

const getTopTenBestStudents = async(year) => {
  try {
    let bestStudents = await sequelize.query(`select a.id, a.studentname, b.gpa, c.classname from students a 
    inner join summaries b on a.id = b.studentId 
    inner join classes c on b.classId = c.id 
    inner join grades d on c.gradeId = d.id 
    where d.year = :year order by b.gpa desc limit 10`, {
      replacements:{year},
      type: sequelize.QueryTypes.SELECT
    });
    return {
      EM: "success",
      EC: 0,
      DT: bestStudents,
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

const compareGpaOfOneStudent = async(id) => {
  try {
    let allGpa = await sequelize.query(`select a.studentname, b.gpa, c.classname from students a 
    inner join summaries b on a.id = b.studentId 
    inner join classes c on b.classId = c.id  
    where a.id = :id order by classId DESC`, {
      replacements:{id},
      type: sequelize.QueryTypes.SELECT
    });
    return {
      EM: "success",
      EC: 0,
      DT: allGpa,
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: "",
    };
  } 
}

const countAllStudentSortByTitle = async(year) => {
  try {
    let allStudents = await sequelize.query(`select a.title, count(a.studentId) as NumberHS
    from summaries a
    join classes b on a.classId = b.id
    join grades c on b.gradeId = c.id
    where c.year = :year
    group by a.title`, {
      replacements:{year},
      type: sequelize.QueryTypes.SELECT
    });
    return {
      EM: "success",
      EC: 0,
      DT: allStudents,
    }
  } catch (e) {
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
    getExcellentStudentInEachGrade,
    compareNumOfStudentInTwoYears,
    countAllStudentSortByTitle,
    getTopTenBestStudents,
    compareGpaOfOneStudent,
  }