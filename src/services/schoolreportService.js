import { where } from "sequelize";
import db, { Sequelize, sequelize } from "../models/index";
import middlewareTrigger from "../middleware/trigger"

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
      data = await db.schoolreports.findAll({
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

  const createSchoolreportService = async (arrayStudentId, classId) => {
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
        let res = await db.schoolreports.create({
            classId: classId,
            studentId: studentId,
        });
  
        await middlewareTrigger.totalStudentInclass(classId);

        let summaries = await db.summaries.bulkCreate(
            [
                {
                    schoolreportId: res.id,
                    term: 1,
                    behaviorpoint: 100,
                }, 
                {
                    schoolreportId: res.id,
                    term: 2,
                    behaviorpoint: 100,
                }
            ]
        )
  
        for (const subject of subjects) {
            for(const summary of summaries) {
                await db.subjectresults.create({
                  summaryId: summary.id,
                  subjectId: subject.id,
                });
            }
        }
        }
      );
      return {
        EM: "success",
        EC: 0,
        DT: "res",
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
      data = await db.schoolreports.findAll({
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

const getDetailsTranscriptByStudentId = async(studentId) => {
    try {
      let data = await db.schoolreports.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          studentId: studentId
        },
        include: [
            {
                model: db.summaries,
                attributes: { exclude: ["createdAt", "updatedAt", "id"] },
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
                    },
                ]
            },
            {
                model: db.classes,
                attributes: ['classname'],  
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
    getAllClassByStudentIdService,
    createSchoolreportService,
    getAllStudentByClassIdService,
    getDetailsTranscriptByStudentId
  }