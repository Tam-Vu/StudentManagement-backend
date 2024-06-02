import { where } from "sequelize";
import db, { Sequelize, sequelize } from "../models/index";
import bcrypt from "bcryptjs";
const { Op } = require("sequelize");

const assignTeacherIntoClasses = async(teacherId, classId, subjectId) => {
  try {
    let assignment = await db.assignments.findOne({
      where: {
        classId: classId,
        subjectId: subjectId
      }
    })

    if(assignment === null) {
      return {
        EM: "not found this assignment",
        EC: 1,
        DT: "",
      };
    }

  let data = await db.assignments.update({
    teacherId: teacherId
  },
  {
    where: {
      id: assignment.id,
    }
  })
  return {
    EM: "success",
    EC: 0,
    DT: "",
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
  assignTeacherIntoClasses
};
