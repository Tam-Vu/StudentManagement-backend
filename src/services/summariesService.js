import { where } from "sequelize";
import db, { Sequelize, sequelize } from "../models/index";
import subjects from "../models/subjects";
import subjectresults from "../models/subjectresults";
import middlewareTrigger from "../middleware/trigger";
const { Op } = require("sequelize");

const getAllStudentService = async (gradeId, year) => {
  let data = [];
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
    }
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

const getSummariesByTerm = async (studentId, grade, term) => {
  try {
    let data = await db.schoolreports.findAll({
      where: {
        studentId: studentId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "classId", "studentId"],
      },
      include: [
        {
          model: db.classes,
          attributes: ["classname"],
          include: [
            {
              model: db.grades,
              where: {
                gradename: grade,
              },
              attributes: ["gradename", "year"],
            },
          ],
        },
        {
          model: db.summaries,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: {
            term: term,
          },
          include: [
            {
              model: db.subjectresults,
              attributes: {
                exclude: ["createdAt", "updatedAt", "summaryId", "subjectId"],
              },
              include: [
                {
                  model: db.subjects,
                  attributes: ["subjectname"],
                },
              ],
            },
          ],
        },
        {
          model: db.students,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.User,
              attributes: ["username", "email", "image"],
            },
          ],
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
      EM: "summary not found",
      EC: 1,
      DT: "",
    };
  }
};

module.exports = {
  getAllStudentService,
  getSummariesByTerm,
};
