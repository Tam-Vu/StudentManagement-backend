import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";
const createNewBelongToClassesService = async (data) => {
  try {
    if (!data.studentId || !data.teacherId) {
      return {
        EM: "All fields are required!!!",
        EC: 1,
        DT: [],
      };
    } else {
      let res = await db.belongtoclasses.create({
        studentId: data.studentId,
        teacherId: data.teacherId,
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
    data = await db.belongtoclasses.findAll({
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
    data = await db.belongtoclasses.findAll({
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
module.exports = {
  getAllStudentByClassIdService,
  getAllClassByStudentIdService,
  createNewBelongToClassesService,
};
