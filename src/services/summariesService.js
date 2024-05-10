import { where } from "sequelize";
import db, { Sequelize } from "../models/index";
import subjects from "../models/subjects";
import subjectresults from "../models/subjectresults"
const { Op } = require("sequelize");

// Tạo học bạ
const createSummaryService = async (data) => {
  let checkStudent = {};
  try {
    // kiểm tra tham số đầu vào
    if (!data.studentId || !data.classId) {
      return {
        EM: "All fields are required!!!",
        EC: 1,
        DT: [],
      };
    } else {
      // kiểm tra xem hs có lớp chưa
      checkStudent = await db.summaries.findOne({
        where: {
          classId: data.classId,
          studentId: data.studentId,
        },
      });
      if (checkStudent) {
        return {
          EM: "This student is already in this class",
          EC: 1,
          DT: [],
        };
      }
      
      let res = await db.summaries.create({
        studentId: data.studentId,
        classId: data.classId,
      });

      //Khi tạo học bạ thì tạo các môn trong học bạ
      let subjects = await db.subjects.findAll();
      console.log(subjects);
      for (const subject of subjects) {
        await db.subjectresults.create({
          summaryId: res.id,
          subjectId: subject.id,
        });
      }

      return {
        EM: "success",
        EC: 0,
        DT: res,
      };
    }
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

module.exports = {
  getAllStudentByClassIdService,
  getAllClassByStudentIdService,
  createSummaryService,
  getAllStudentService,
  getDetailsTranscriptByStudentId,
};
