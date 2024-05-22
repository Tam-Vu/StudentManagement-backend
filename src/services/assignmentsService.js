import { where } from "sequelize";
import db, { Sequelize, sequelize } from "../models/index";
import bcrypt from "bcryptjs";
const { Op } = require("sequelize");

const assignTeacherIntoClasses = async(teacherId, classIds)=>{
  let teachersClassAssignment = [];
  teachersClassAssignment = classIds;
  // if (teachersClassAssignment.length === 0) {
  //   return {
  //     EM: "No Classes Assigned.",
  //     EC: 1,
  //     DT: "",
  //   };
  // }

  // for (let i of teachersClassAssignment) {
    await db.assignments.create ({
      teacherId: teacherId,
      classId: classIds
    })
  // }
  return {
    EM: "success.",
    EC: 1,
    DT: "",
  };
}
module.exports = {
  assignTeacherIntoClasses
};
