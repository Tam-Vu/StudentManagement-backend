import { FLOAT, where } from "sequelize";
import db from "../models/index";
import trigger from "../middleware/trigger"
import { raw } from "body-parser";
import csv from "csv-parser";
import fs from "fs";


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

const inputScoreService = async(classId, studentId, teacherComment, fifteen_1, fifteen_2, fifteen_3, fifteen_4,
fourtyFive_1, fourtyFive_2, finalExam, subjectId) => {
  if (fifteen_1 < 0 || fifteen_2 < 0 || fifteen_3 < 0 || fifteen_4 < 0 || fourtyFive_1 < 0 || fourtyFive_2 < 0 || finalExam < 0) {
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
  console.log(summary);
  let summary = summaryTemp.dataValues.id;
  let subjectResultIdTemp = await db.subjectresults.findOne({
      where: {
          summaryId: summary,
          subjectId: subjectId,
      }
  })
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
};

const importScoreByExcel = async(filepath, classId, subjectId) => {
  if(filepath === null) {
    return {
      EM: "not found file",
      EC: 1,
      DT: '',
    };
  }

  let term = await db.params.findOne({
    where: {
        paramName: "typeterm"
    },
    attributes: ['paramValue'],
    raw: true,
  })

  let fileContent = await fs.promises.readFile(filepath, 'utf8');
  let lines = fileContent.split('\n');
  console.log(lines.length);
  let dataLines = lines.slice(2, lines.length);
  let success = false; // Biến cờ
  for(line of dataLines) {
    try {
      const columns = line.split(',');
      let schoolreport = await db.schoolreports.findOne({
        attributes: ['id'],
        where: {
          studentId: columns[0],
          classId: classId,
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
              subjectId: subjectId,
          }
      })
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
      if (columns[2] !== null) {
        allCoefficient += fifteenMinNum;
        totalScore += fifteenMinNum * columns[2];
      }
      if (columns[3] !== null) {
        allCoefficient += fifteenMinNum;
        totalScore += fifteenMinNum * columns[3];
      }
      if (columns[4] !== null) {
        allCoefficient += fifteenMinNum;
        totalScore += fifteenMinNum * columns[4];
      }
      if (columns[5] !== null) {
        allCoefficient += fifteenMinNum;
        totalScore += fifteenMinNum * columns[5];
      }
      if (columns[6] !== null) {
        allCoefficient += fourtyFiveMinNum;
        totalScore += fourtyFiveMinNum * columns[6];
      }
      if (columns[7] !== null) {
        allCoefficient += fourtyFiveMinNum;
        totalScore += fourtyFiveMinNum * columns[7];
      }
      if (columns[8] !== null) {
        allCoefficient += lastTestMinNum;
        totalScore += lastTestMinNum * columns[8];
      }
      let evarage = totalScore / allCoefficient;
      if (evarage >= finalResult) {
        conclude = "Đạt";
      } else {
        conclude = "Không đạt";
      }
      await db.subjectresults.update(
        {
          fifteenMinExam_1: columns[2],
          fifteenMinExam_2: columns[3],
          fifteenMinExam_3: columns[4],
          fifteenMinExam_4: columns[5],
          fortyFiveMinExam_1: columns[6],
          fortyFiveMinExam_2: columns[7],
          finalTest: columns[8],
          averageScore: evarage.toFixed(2),
          result: conclude,
        },
        {
          where: {
            id: subjectResultId,
          },
        }
      );
      // let data = await db.subjectresults.findOne({
      //   where: {
      //     id: subjectResultId,
      //   },
      // });
      await trigger.updateGpaFromSubjectResults(summary);
      await fs.unlinkSync(filepath);
      return {
        EM: "success",
        EC: 0,
        DT: "",
      };
      success = true;
    } catch(e) {
      console.log(e);
      return {
        EM: "fomat file wrong",
        EC: 1,
        DT: [],
      };
    }
  }
  if (success) { // Nếu lặp hoàn thành thành công, trả về kết quả thành công
    return {
      EM: "success",
      EC: 0,
      DT: "",
    };
  } else { // Nếu không có bất kỳ lần lặp nào hoàn thành thành công
    return {
      EM: "no successful import",
      EC: 1,
      DT: "",
    };
  }
}
module.exports = {
  findAllSubjectResultService,
  inputScoreService,
  findSubjectResultBySubjectService,
  importScoreByExcel
};
