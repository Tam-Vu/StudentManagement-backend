import { FLOAT, where } from "sequelize";
import db from "../models/index";
import trigger from "../middleware/trigger";

const findAllSubjectResultService = async (summaryId) => {
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
};

const findSubjectResultBySubjectService = async (summaryId, subjectId) => {
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
};

const inputScoreService = async (
  classId,
  studentId,
  teacherComment,
  fifteen_1,
  fifteen_2,
  fifteen_3,
  fifteen_4,
  fourtyFive_1,
  fourtyFive_2,
  finalExam,
  subjectId
) => {
  if (
    fifteen_1 < 0 ||
    fifteen_2 < 0 ||
    fifteen_3 < 0 ||
    fifteen_4 < 0 ||
    fourtyFive_1 < 0 ||
    fourtyFive_2 < 0 ||
    finalExam < 0
  ) {
    return {
      EM: "the score must be greater than 0.",
      EC: 1,
      DT: [],
    };
  }
  let summaryTemp = await db.summaries.findOne({
    attributes: ["id"],
    where: {
      studentId: studentId,
      classId: classId,
    },
  });
  let summary = summaryTemp.dataValues.id;
  console.log("SUMMARY", summary);
  let subjectResultIdTemp;
  try {
    subjectResultIdTemp = await db.subjectresults.findOne({
      where: {
        summaryId: summary,
        subjectId: subjectId,
      },
    });
  } catch (error) {
    console.log(error);
  }
  let subjectResultId = subjectResultIdTemp.dataValues.id;
  console.log("SUBJECTREUL", subjectResultId);
  // let temp1 = await db.subjects.findOne({where:{id:subjectId},attributes: [ 'fifteenMinFactor' ]});
  // let fifteenMinNum = temp1.dataValues.fifteenMinFactor;

  // let temp2 = await db.subjects.findOne({where:{id:subjectId}, attributes: [ 'fourtyFiveMinFactor' ]});
  // let fourtyFiveMinNum = temp2.dataValues.fourtyFiveMinFactor;

  // let temp3 = await db.subjects.findOne({where:{id:subjectId}, attributes: [ 'finalFactor' ]});
  // let lastTestMinNum = temp3.dataValues.finalFactor;

  // let temp4 = await db.subjects.findOne({where:{id:subjectId}, attributes: [ 'minPassScore' ]});
  // let finalResult = temp4.dataValues.minPassScore;

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
};

module.exports = {
  findAllSubjectResultService,
  inputScoreService,
  findSubjectResultBySubjectService,
};
