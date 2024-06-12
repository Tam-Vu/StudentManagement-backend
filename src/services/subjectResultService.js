import { FLOAT, where } from "sequelize";
import db from "../models/index";
import trigger from "../middleware/trigger";
import { raw } from "body-parser";
import csv from "csv-parser";
import fs from "fs";

const findAllSubjectResultService = async (summaryId) => {
  try {
    let subjectResults = await db.subjectresults.findAll({
      where: {
        summaryId: summaryId,
      },
    });
    if (subjectResults == null) {
      return {
        EM: "Academic transcript not found",
        EC: 1,
        DT: [],
      };
    }
    return {
      EM: "success",
      EC: "0",
      DT: subjectResults,
    };
  } catch(e) {
    return {
      EM: "can't delete subject",
      EC: 1,
      DT: "",
    };
  }
};

const findSubjectResultBySubjectService = async (summaryId, subjectId) => {
  try {
    let subjectResult = await db.subjectresults.findAll({
      where: {
        summaryId: summaryId,
        subjectId: subjectId,
      },
    });
    if (subjectResult == null) {
      return {
        EM: "Academic transcript not found or no record of this subject in academic transcript.",
        EC: 1,
        DT: [],
      };
    }
    return {
      EM: "success",
      EC: 0,
      DT: subjectResult,
    };
  } catch(e) {
    return {
      EM: "can't delete subject",
      EC: 1,
      DT: "",
    };
  }
};

const inputScoreService = async ( classId, studentId, teacherComment, fifteen_1, fifteen_2, fifteen_3, 
  fifteen_4, fourtyFive_1, fourtyFive_2, finalExam, subjectId) => {
  try {
    if ( fifteen_1 < 0 || fifteen_2 < 0 || fifteen_3 < 0 || fifteen_4 < 0 || fourtyFive_1 < 0 || fourtyFive_2 < 0 || finalExam < 0) {
      return {
        EM: "the score must be greater than 0.",
        EC: 1,
        DT: [],
      };
    }
    let schoolreport = await db.schoolreports.findOne({
        attributes: ['id'],
        where: {
            studentId: studentId,
            classId: classId,
        },
        raw: true,
    })
    let term = await db.params.findOne({
        where: {
            paramName: "typeterm"
        },
        attributes: ['paramValue'],
        raw: true,
    })
    let summaryTemp = await db.summaries.findOne({
        attributes: ['id'],
        where: {
            schoolreportId: schoolreport['id'],
            term: term['paramValue']
        }
    })
    let summary = summaryTemp.dataValues.id;
    let subjectResultIdTemp = await db.subjectresults.findOne({
      where: {
        summaryId: summary,
        subjectId: subjectId,
      },
    });
    let subjectResultId = subjectResultIdTemp.dataValues.id;

    let subjectTemp = await db.subjects.findOne({ where: { id: subjectId } });
    let subject = subjectTemp.get({ plain: true });
    let fifteenMinNum = subject.fifteenMinFactor;
    let fourtyFiveMinNum = subject.fourtyFiveMinFactor;
    let lastTestMinNum = subject.finalFactor;
    let finalResult = subject.fourtyFiveMinFactor;

    let conclude;
    let allCoefficient = 0;
    let totalScore = 0;
    if (fifteen_1 !== null) {
      allCoefficient += fifteenMinNum;
      totalScore += fifteenMinNum * fifteen_1;
    }
    if (fifteen_2 !== null) {
      allCoefficient += fifteenMinNum;
      totalScore += fifteenMinNum * fifteen_2;
    }
    if (fifteen_3 !== null) {
      allCoefficient += fifteenMinNum;
      totalScore += fifteenMinNum * fifteen_3;
    }
    if (fifteen_4 !== null) {
      allCoefficient += fifteenMinNum;
      totalScore += fifteenMinNum * fifteen_4;
    }
    if (fourtyFive_1 !== null) {
      allCoefficient += fourtyFiveMinNum;
      totalScore += fourtyFiveMinNum * fourtyFive_1;
    }
    if (fourtyFive_2 !== null) {
      allCoefficient += fourtyFiveMinNum;
      totalScore += fourtyFiveMinNum * fourtyFive_2;
    }
    if (finalExam !== null) {
      allCoefficient += lastTestMinNum;
      totalScore += lastTestMinNum * finalExam;
    }
    let evarage = totalScore / allCoefficient;
    if (evarage >= finalResult) {
      conclude = "Đạt";
    } else {
      conclude = "Không đạt";
    }
    await db.subjectresults.update(
      {
        fifteenMinExam_1: fifteen_1,
        fifteenMinExam_2: fifteen_2,
        fifteenMinExam_3: fifteen_3,
        fifteenMinExam_4: fifteen_4,
        fortyFiveMinExam_1: fourtyFive_1,
        fortyFiveMinExam_2: fourtyFive_2,
        finalTest: finalExam,
        teachercomment: teacherComment,
        averageScore: evarage.toFixed(2),
        result: conclude,
      },
      {
        where: {
          id: subjectResultId,
        },
      }
    );
    let data = await db.subjectresults.findOne({
      where: {
        id: subjectResultId,
      },
    });
    await trigger.updateGpaFromSubjectResults(summary);
    return {
      EM: "success",
      EC: 0,
      DT: data,
    };
  } catch(e) {
    return {
      EM: "can't import score",
      EC: 1,
      DT: "",
    };
  }
};

const importScoreByExcel = async (data) => {
  try {
    let term = await db.params.findOne({
      where: {
        paramName: "typeterm",
      },
      attributes: ["paramValue"],
      raw: true,
    });

    let subjectTemp = await db.subjects.findOne({ where: { id: data[0].subjectId } });
    let subject = subjectTemp.get({ plain: true });
    let fifteenMinNum = subject.fifteenMinFactor;
    let fourtyFiveMinNum = subject.fourtyFiveMinFactor;
    let lastTestMinNum = subject.finalFactor;
    let finalResult = subject.fourtyFiveMinFactor;
  
    for(let singleData of data) {
      let schoolreport = await db.schoolreports.findOne({
        attributes: ['id'],
        where: {
            studentId: singleData.studentId,
            classId: singleData.classId,
        },
        raw: true,
      })
  
      let summaryTemp = await db.summaries.findOne({
        attributes: ['id'],
        where: {
            schoolreportId: schoolreport['id'],
            term: term['paramValue']
        }
      })
      let summary = summaryTemp.dataValues.id;
      let subjectResultIdTemp = await db.subjectresults.findOne({
        where: {
          summaryId: summary,
          subjectId: subject.id,
        },
      });
      let subjectResultId = subjectResultIdTemp.dataValues.id;
    
      let conclude;
      let allCoefficient = 0;
      let totalScore = 0;
      if (singleData.fifteen_1 !== null) {
        allCoefficient += fifteenMinNum;
        totalScore += fifteenMinNum * singleData.fifteen_1;
      }
      if (singleData.fifteen_2 !== null) {
        allCoefficient += fifteenMinNum;
        totalScore += fifteenMinNum * singleData.fifteen_2;
      }
      if (singleData.fifteen_3 !== null) {
        allCoefficient += fifteenMinNum;
        totalScore += fifteenMinNum * singleData.fifteen_3;
      }
      if (singleData.fifteen_4 !== null) {
        allCoefficient += fifteenMinNum;
        totalScore += fifteenMinNum * singleData.fifteen_4;
      }
      if (singleData.fourtyFive_1 !== null) {
        allCoefficient += fourtyFiveMinNum;
        totalScore += fourtyFiveMinNum * singleData.fourtyFive_1;
      }
      if (singleData.fourtyFive_2 !== null) {
        allCoefficient += fourtyFiveMinNum;
        totalScore += fourtyFiveMinNum * singleData.fourtyFive_2;
      }
      if (singleData.finalExam !== null) {
        allCoefficient += lastTestMinNum;
        totalScore += lastTestMinNum * singleData.finalExam;
      }
      let evarage = totalScore / allCoefficient;
      if (evarage >= finalResult) {
        conclude = "Đạt";
      } else {
        conclude = "Không đạt";
      }
      await db.subjectresults.update(
        {
          fifteenMinExam_1: singleData.fifteen_1,
          fifteenMinExam_2: singleData.fifteen_2,
          fifteenMinExam_3: singleData.fifteen_3,
          fifteenMinExam_4: singleData.fifteen_4,
          fortyFiveMinExam_1: singleData.fourtyFive_1,
          fortyFiveMinExam_2: singleData.fourtyFive_2,
          finalTest: singleData.finalExam,
          teachercomment: teacherComment,
          averageScore: evarage.toFixed(2),
          result: conclude,
        },
        {
          where: {
            id: subjectResultId,
          },
        }
      );
      await trigger.updateGpaFromSubjectResults(summary);
    }
    return {
      EM: "success",
      EC: 0,
      DT: "",
    };
  } catch(e) {
    return {
      EM: "can't delete subject",
      EC: 1,
      DT: "",
    };
  }
};
module.exports = {
  findAllSubjectResultService,
  inputScoreService,
  findSubjectResultBySubjectService,
  importScoreByExcel,
};
