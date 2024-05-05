import { where } from "sequelize";
import db, { Sequelize } from "../models/index";
const { Op } = require("sequelize");
const createSummaryService = async (data) => {
  let checkStudent = {};
  try {
    if (!data.studentId || !data.classId) {
      return {
        EM: "All fields are required!!!",
        EC: 1,
        DT: [],
      };
    } else {
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
module.exports = {
  getAllStudentByClassIdService,
  getAllClassByStudentIdService,
  createSummaryService,
  getAllStudentService,
};
