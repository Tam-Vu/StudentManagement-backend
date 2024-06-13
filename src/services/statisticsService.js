import { where } from "sequelize";
import db, { Sequelize, sequelize } from "../models/index";
const { Op } = require("sequelize");

const getBestStudentInEachGrade = async (year) => {
  try {
    let bestStudentInGrade10 = await sequelize.query(
      `select a.id, a.studentname, b.concludecore, c.classname from students a inner join schoolreports b on 
      a.id = b.studentId inner join classes c on b.classId = c.id inner join grades d on c.gradeId = d.id where
      d.gradename = "10" and d.year = :year order by b.concludecore desc limit 1`,
      {
        replacements: { year },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    let bestStudentInGrade11 = await sequelize.query(
      `select a.id, a.studentname, b.concludecore, c.classname from students a inner join schoolreports b on 
      a.id = b.studentId inner join classes c on b.classId = c.id inner join grades d on c.gradeId = d.id where
      d.gradename = "11" and d.year = :year order by b.concludecore desc limit 1`,
      {
        replacements: { year },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    let bestStudentInGrade12 = await sequelize.query(
      `select a.id, a.studentname, b.concludecore, c.classname from students a inner join schoolreports b on 
      a.id = b.studentId inner join classes c on b.classId = c.id inner join grades d on c.gradeId = d.id where
      d.gradename = "12" and d.year = :year order by b.concludecore desc limit 1`,
      {
        replacements: { year },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return {
      EM: "success",
      EC: 0,
      DT: [
        bestStudentInGrade10[0],
        bestStudentInGrade11[0],
        bestStudentInGrade12[0],
      ],
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};

const getExcellentStudentInEachGrade = async (year) => {
  try {
    let countExcellentStudentInGrade10 = await sequelize.query(
      `
      SELECT COALESCE(COUNT(schoolreports.studentId), 0) AS NumberHSG, grades.total AS NumberHSTotal, grades.gradename AS grade
      FROM grades 
      LEFT JOIN classes ON grades.id = classes.gradeId 
      LEFT JOIN schoolreports ON classes.id = schoolreports.classId 
      AND schoolreports.concludetitle = 'giỏi'
      WHERE grades.gradename = '10' AND grades.year = :year
      GROUP BY 
      grades.total, grades.gradename;
      `,
      {
        replacements: { year },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    let countExcellentStudentInGrade11 = await sequelize.query(
      `
      SELECT COALESCE(COUNT(schoolreports.studentId), 0) AS NumberHSG, grades.total AS NumberHSTotal, grades.gradename AS grade
      FROM grades 
      LEFT JOIN classes ON grades.id = classes.gradeId 
      LEFT JOIN schoolreports ON classes.id = schoolreports.classId 
      AND schoolreports.concludetitle = 'giỏi'
      WHERE grades.gradename = '11'AND grades.year = :year
      GROUP BY 
      grades.total, grades.gradename;
      `,
      {
        replacements: { year },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    let countExcellentStudentInGrade12 = await sequelize.query(
      `
      SELECT COALESCE(COUNT(schoolreports.studentId), 0) AS NumberHSG, grades.total AS NumberHSTotal, grades.gradename AS grade
      FROM grades 
      LEFT JOIN classes ON grades.id = classes.gradeId 
      LEFT JOIN schoolreports ON classes.id = schoolreports.classId 
      AND schoolreports.concludetitle = 'giỏi'
      WHERE grades.gradename = '12'AND grades.year = :year
      GROUP BY 
      grades.total, grades.gradename;
      `,
      {
        replacements: { year },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return {
      EM: "success",
      EC: 0,
      DT: [
        countExcellentStudentInGrade10[0],
        countExcellentStudentInGrade11[0],
        countExcellentStudentInGrade12[0],
      ],
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};

const compareNumOfStudentInTwoYears = async (year) => {
  try {
    let lastyear = year - 1;
    let lastlastyear = lastyear - 1;
    let NumOfStudentByTitleInThisYear = await sequelize.query(
      `
    SELECT 
    SUM(CASE WHEN concludetitle = 'giỏi' THEN 1 ELSE 0 END) AS NumberHSG,
    SUM(CASE WHEN concludetitle = 'khá' THEN 1 ELSE 0 END) AS NumberHSK,
    SUM(CASE WHEN concludetitle = 'trung bình' THEN 1 ELSE 0 END) AS NumberHSTB,
    SUM(CASE WHEN concludetitle = 'yếu' THEN 1 ELSE 0 END) AS NumberHSY
    FROM schoolreports
    JOIN classes ON schoolreports.classId = classes.id
    JOIN students ON students.id = schoolreports.studentId
    JOIN users ON students.userId = users.id
    JOIN grades ON classes.gradeId = grades.id 
    WHERE grades.year = :year
    AND users.isLocked = 0
      `,
      {
        replacements: { year },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    let NumOfStudentByTitleInLastYear = await sequelize.query(
      `
      SELECT 
      SUM(CASE WHEN concludetitle = 'giỏi' THEN 1 ELSE 0 END) AS NumberHSG,
      SUM(CASE WHEN concludetitle = 'khá' THEN 1 ELSE 0 END) AS NumberHSK,
      SUM(CASE WHEN concludetitle = 'trung bình' THEN 1 ELSE 0 END) AS NumberHSTB,
      SUM(CASE WHEN concludetitle = 'yếu' THEN 1 ELSE 0 END) AS NumberHSY
      FROM schoolreports 
      JOIN classes ON schoolreports.classId = classes.id
      JOIN students ON students.id = schoolreports.studentId
      JOIN users ON students.userId = users.id
      JOIN grades ON classes.gradeId = grades.id 
      WHERE grades.year = :lastyear
      AND users.isLocked = 0
      `,
      {
        replacements: { lastyear },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    let NumOfStudentByTitleInLastLastYear = await sequelize.query(
      `
      SELECT 
      SUM(CASE WHEN concludetitle = 'giỏi' THEN 1 ELSE 0 END) AS NumberHSG,
      SUM(CASE WHEN concludetitle = 'khá' THEN 1 ELSE 0 END) AS NumberHSK,
      SUM(CASE WHEN concludetitle = 'trung bình' THEN 1 ELSE 0 END) AS NumberHSTB,
      SUM(CASE WHEN concludetitle = 'yếu' THEN 1 ELSE 0 END) AS NumberHSY
      FROM schoolreports 
      JOIN classes ON schoolreports.classId = classes.id
      JOIN students ON students.id = schoolreports.studentId
      JOIN users ON students.userId = users.id
      JOIN grades ON classes.gradeId = grades.id 
      WHERE grades.year = :lastlastyear
      AND users.isLocked = 0
      `,
      {
        replacements: { lastlastyear },
        type: sequelize.QueryTypes.SELECT,
      }
    );
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
      ],
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};

const getTopTenBestStudents = async (year) => {
  try {
    let bestStudents = await sequelize.query(
      `select a.id, a.studentname, b.concludecore, c.classname from students a 
    inner join schoolreports b on a.id = b.studentId 
    inner join classes c on b.classId = c.id 
    inner join grades d on c.gradeId = d.id 
    where d.year = :year order by b.concludecore desc limit 10`,
      {
        replacements: { year },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return {
      EM: "success",
      EC: 0,
      DT: bestStudents,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};

const compareGpaOfOneStudent = async (id) => {
  try {
    let allGpa = await sequelize.query(
      `select a.studentname, b.concludecore, c.classname from students a 
    inner join schoolreports b on a.id = b.studentId 
    inner join classes c on b.classId = c.id  
    where a.id = :id order by classId DESC`,
      {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return {
      EM: "success",
      EC: 0,
      DT: allGpa,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};

const countAllStudentSortByTitle = async (year) => {
  try {
    let allStudents = await sequelize.query(
      `select a.concludetitle, count(a.studentId) as NumberHS
    from schoolreports a
    join classes b on a.classId = b.id
    join grades c on b.gradeId = c.id
    where c.year = :year
    group by a.concludetitle`,
      {
        replacements: { year },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return {
      EM: "success",
      EC: 0,
      DT: allStudents,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};

const compareGpaToClass = async (studentId, year, term) => {
  try {
    let data = await sequelize.query(
      `
      SELECT 
    student_scores.subjectId,
    student_scores.subjectname,
    student_scores.studentAverageScore,
    class_scores.classAverageScore
FROM (
    SELECT 
        sb.id AS subjectId,
        sb.subjectname,
        sr.averageScore AS studentAverageScore
    FROM 
        subjects sb
        JOIN subjectresults sr ON sb.id = sr.subjectId
        JOIN summaries su ON sr.summaryId = su.id
        JOIN schoolreports sc ON su.schoolreportId = sc.id
    WHERE 
        sc.studentId = :studentId
        AND su.term = :term
        AND sc.classId IN (
            SELECT c.id
            FROM classes c
            JOIN grades g ON c.gradeId = g.id
            WHERE g.year = :year
        )
) AS student_scores
JOIN (
    SELECT 
        sb.id AS subjectId,
        sb.subjectname,
       ROUND(AVG(sr.averageScore), 2) AS classAverageScore
    FROM 
        subjects sb
        JOIN subjectresults sr ON sb.id = sr.subjectId
        JOIN summaries su ON sr.summaryId = su.id
        JOIN schoolreports sc ON su.schoolreportId = sc.id
        JOIN classes c ON sc.classId = c.id
        JOIN grades g ON c.gradeId = g.id
    WHERE 
        sc.classId = (
            SELECT classId
            FROM schoolreports
            WHERE studentId = :studentId
            LIMIT 1
        )
        AND su.term = :term
        AND g.year = :year
    GROUP BY 
        sb.id,
        sb.subjectname
) AS class_scores 
ON student_scores.subjectId = class_scores.subjectId;
`,
      {
        replacements: { studentId, year, term },
        type: sequelize.QueryTypes.SELECT,
      }
    );
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
      DT: "",
    };
  }
};

module.exports = {
  getBestStudentInEachGrade,
  getExcellentStudentInEachGrade,
  compareNumOfStudentInTwoYears,
  countAllStudentSortByTitle,
  getTopTenBestStudents,
  compareGpaOfOneStudent,
  compareGpaToClass,
};
