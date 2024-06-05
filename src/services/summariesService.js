import { where } from "sequelize";
import db, { Sequelize, sequelize } from "../models/index";
import subjects from "../models/subjects";
import subjectresults from "../models/subjectresults";
import middlewareTrigger from "../middleware/trigger";
const { Op } = require("sequelize");

const getAllStudentService = async (gradeId, year) => {
  let data = [];
  try {
    data = await db.students.findAll({
      include: [
        {
          model: db.User,
          where: {
            isLocked: 0,
          },
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
      EC: 0,
      DT: data,
    };
  }
};

module.exports = {
  getAllStudentService,
};
