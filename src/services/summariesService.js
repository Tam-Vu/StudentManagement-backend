import { where } from "sequelize";
import db, { Sequelize, sequelize } from "../models/index";
import subjects from "../models/subjects";
import subjectresults from "../models/subjectresults"
const { Op } = require("sequelize");

// Tạo học bạ
const createSummaryService = async (arrayStudentId, classId) => {
  try {
    let subjects = await db.subjects.findAll({
      where: {
        isdeleted: 0,
      }
    });
    arrayStudentId.forEach(async(studentId) => {        
      await db.students.update({
        statusinyear: 1,
      }, {where: {
        id: studentId
      }})
      let res = await db.summaries.create({
        studentId: studentId,
        classId: classId,
      });
      for (const subject of subjects) {
        await db.subjectresults.create({
          summaryId: res.id,
          subjectId: subject.id,
        });
      }
      }
    );
    return {
      EM: "success",
      EC: 0,
      DT: res,
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

//lấy học sinh theo lớp
const getAllStudentByClassIdService = async (classId) => {
  let data = [];
  let checkClass = {};
  console.log("CLASSID: " + classId);
  try {
    checkClass = await db.classes.findAll({
      where: {
        id: classId,
      },
    });
    console.log(checkClass);
    if (checkClass.length === 0) {
      return {
        EM: "No class found",
        EC: 1,
        DT: "",
      };
    }
    data = await db.summaries.findAll({
      where: {
        classId: classId,
      },
      include: [
        {
          model: db.classes,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: db.students,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
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
      DT: "",
    };
  }
};

const getAllClassByStudentIdService = async (studentId) => {
  let data = [];
  let checkStudentId = {};
  try {
    checkStudentId = await db.students.findOne({
      where: {
        id: studentId,
      },
    });
    console.log(checkStudentId);
    if (checkStudentId.length === 0) {
      return {
        EM: "No student found",
        EC: 1,
        DT: "",
      };
    }
    data = await db.summaries.findAll({
      where: {
        studentId: studentId,
      },
      include: [
        {
          model: db.classes,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: db.students,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
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
      DT: "",
    };
  }
};

const getAllStudentService = async (searchFilter, gradename, year) => {
  let data = [];
  console.log("SEARCHFILTER: " + searchFilter);
  try {
    if (gradename != "" && year == "") {
      data = await db.summaries.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.classes,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
              model: db.grades,
              attributes: { exclude: ["createdAt", "updatedAt"] },
              where: {
                gradename: gradename,
              },
            },
            where: {
              // classname: { [Op.like]: `%${searchFilter}%` },
            },
          },
          {
            model: db.students,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {
              studentname: { [Op.like]: `%${searchFilter}%` },
            },
          },
        ],
      });
      return {
        EM: "success",
        EC: 0,
        DT: data,
      };
    } else if (year != "" && gradename == "") {
      data = await db.summaries.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.classes,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
              model: db.grades,
              attributes: { exclude: ["createdAt", "updatedAt"] },
              where: {
                year: year,
              },
            },
            where: {
              // classname: { [Op.like]: `%${searchFilter}%` },
            },
          },
          {
            model: db.students,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {
              studentname: { [Op.like]: `%${searchFilter}%` },
            },
          },
        ],
      });
      return {
        EM: "success",
        EC: 0,
        DT: data,
      };
    } else if (year != "" && gradename != "") {
      data = await db.summaries.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.classes,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {
              // classname: { [Op.like]: `%${searchFilter}%` },
            },
            include: {
              model: db.grades,
              attributes: { exclude: ["createdAt", "updatedAt"] },
              where: {
                gradename: gradename,
                year: year,
              },
            },
          },
          {
            model: db.students,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {
              studentname: { [Op.like]: `%${searchFilter}%` },
            },
          },
        ],
      });
      return {
        EM: "success",
        EC: 0,
        DT: data,
      };
    } else if (year == "" && gradename == "") {
      data = await db.summaries.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.classes,
            attributes: { exclude: ["createdAt", "updatedAt", "id"] },
            where: {
              id: Sequelize.col("summaries.classId"),
            },
            include: {
              model: db.grades,
              attributes: { exclude: ["createdAt", "updatedAt", "id"] },
            },
          },
          {
            model: db.students,
            attributes: { exclude: ["createdAt", "updatedAt", "id"] },
            where: {
              id: Sequelize.col("summaries.studentId"),
              studentname: { [Op.like]: `%${searchFilter}%` },
            },
          },
        ],
      });
      return {
        EM: "success",
        EC: 0,
        DT: data,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};

const getDetailsTranscriptByStudentId = async(studentId) => {
  try {
    let data = await db.summaries.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        studentId: studentId
      }
      ,
      include: [
        {
          model: db.subjectresults,
          attributes: { exclude: ["createdAt", "updatedAt", "id"] },
          include: [
            {
              model: db.subjects,
              attributes: ['subjectname'],
            }
          ]
        }
      ]
    })
    return {
      EM: "success",
      EC: 0,
      DT: data,
    };
  } catch(e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: "",
    };
  }
} 

const getBestStudentInEachGrade = async(year) => {
  try {
    let bestStudentInGrade10 = await sequelize.query(`select * from students a inner join summaries b on 
    a.id = b.studentId inner join classes c on b.classId = c.id inner join grades d on c.gradeId = d.id where
    d.gradename = "10" and d.year = 2025 order by b.gpa desc limit 1`, {
      // replacements:{year},
      type: sequelize.QueryTypes.SELECT
    });
    console.log(bestStudentInGrade10);
    return {
      EM: "success",
      EC: 0,
      DT: bestStudentInGrade10,
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
  getAllStudentByClassIdService,
  getAllClassByStudentIdService,
  createSummaryService,
  getAllStudentService,
  getDetailsTranscriptByStudentId,
  getBestStudentInEachGrade,
};
