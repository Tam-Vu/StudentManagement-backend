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
        DT: "",
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

const getDetailsTranscriptByStudentId = async(studentId, gradename) => {
    try {
      let schoolReports = await db.schoolreports.findAll({
        attributes: ["concludecore", "concludetitle", "concludebehaviorpoint"],
        where: {
          studentId: studentId
        },
        include: [
          {
            model: db.summaries,
            attributes: ['gpa', 'title', 'behaviorpoint', 'term'],
            include: [
              {
                model: db.subjectresults,
                attributes: ['averageScore', 'result'],
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
            include: [
              {
                model: db.grades,
                attributes: ['gradename'],
              }
            ]
          }
        ]
      });
  
      let subjectMap = {};
      let gradename = '';
      let classname = '';
  
      schoolReports.forEach(report => {
        if (report.class && report.class.grade) {
          gradename = report.class.grade.gradename;
          classname = report.class.classname;
        }
        report.summaries.forEach(summary => {
          summary.subjectresults.forEach(result => {
            let subjectName = result.subject.subjectname;
  
            if (!subjectMap[subjectName]) {
              subjectMap[subjectName] = {
                term1: null,
                term2: null,
                annualAverageScore: null
              };
            }
  
            if (result.averageScore !== null) {
              if (summary.term === 1) {
                subjectMap[subjectName].term1 = result.averageScore;
              } else if (summary.term === 2) {
                subjectMap[subjectName].term2 = result.averageScore;
              }
            }
          });
        });
      });
  
      let annualAverageScores = Object.keys(subjectMap).map(subjectName => {
        let subjectData = subjectMap[subjectName];
        let term1Avg = subjectData.term1;
        let term2Avg = subjectData.term2;
        let annualAvg = null;
  
        if (term1Avg !== null && term2Avg !== null) {
          annualAvg = ((term1Avg + term2Avg) / 2).toFixed(2);
        } else if (term1Avg !== null) {
          annualAvg = term1Avg.toFixed(2);
        } else if (term2Avg !== null) {
          annualAvg = term2Avg.toFixed(2);
        }
  
        return {
          subjectname: subjectName,
          term1AverageScore: term1Avg !== null ? term1Avg.toFixed(2) : null,
          term2AverageScore: term2Avg !== null ? term2Avg.toFixed(2) : null,
          annualAverageScore: annualAvg
        };
      });

      return {
        EM: "success",
        EC: 0,
        DT: {
          gradename: gradename,
          classname: classname,
          subjects: annualAverageScores
        }
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