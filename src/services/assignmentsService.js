import { where } from "sequelize";
import db, { Sequelize, sequelize } from "../models/index";
import bcrypt from "bcryptjs";
const { Op } = require("sequelize");

const assignTeacherIntoClasses = async (teacherId, classId, subjectId) => {
  try {
    let assignment = await db.assignments.findOne({
      where: {
        classId: classId,
        subjectId: subjectId,
      },
    });

    if (assignment === null) {
      return {
        EM: "not found this assignment",
        EC: 1,
        DT: "",
      };
    }

    let data = await db.assignments.update(
      {
        teacherId: teacherId,
      },
      {
        where: {
          id: assignment.id,
        },
      }
    );
    return {
      EM: "success",
      EC: 0,
      DT: "",
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

const getAllAssignmentsInYear = async (year) => {
  try {
    let data = await db.assignments.findAll({
      include: [
        {
          model: db.classes,
          attributes: ["classname", "total"],
          include: [
            {
              model: db.grades,
              attributes: ["gradeName"],
              where: {
                year: year,
              },
            },
          ],
        },
        {
          model: db.teachers,
          attributes: ["teacherName"],
        },
        {
          model: db.subjects,
          attributes: ["subjectname"],
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
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

const deleteTeacherInAssignment = async (subjectId, classId) => {
  try {
    let data = await db.assignments.update(
      {
        teacherId: null,
      },
      {
        where: {
          classId: classId,
          subjectId: subjectId,
        },
      }
    );
    return {
      EM: "success",
      EC: 1,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "assignment not found",
      EC: 1,
      DT: "",
    };
  }
};

module.exports = {
  assignTeacherIntoClasses,
  getAllAssignmentsInYear,
  deleteTeacherInAssignment,
};
