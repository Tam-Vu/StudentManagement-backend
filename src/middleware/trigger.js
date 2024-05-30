
import AsyncQueue from "sequelize/lib/dialects/mssql/async-queue";
import db, { Sequelize, sequelize } from "../models/index";
import { raw } from "body-parser";
const { Op, where } = require("sequelize");

const totalStudentInclass = async(classId) => {
    const count = await db.summaries.count({
        where: {
            classId: classId
        }
    });
    await db.classes.update({
        total: count,
    },
    {
        where: {
            id: classId
        }
    });
    let gradeId = await db.classes.findOne({
        where: {
            id: classId,
        },
        attributes:['gradeId'],
        raw: true,
    })
    await totalStudentInGrade(gradeId['gradeId']);
}

const totalStudentInGrade = async(gradeId) => {
    const count = await db.classes.sum('total', {where: {gradeId: gradeId}});
    await db.grades.update({
        total: count,
    },
    {
      where: {
        id: gradeId
      }  
    })
}

const updateGpaFromSubjectResults = async(summaryId) => {
    let totalPoints = 0;
    let totalWeights = 0;
    let subjectResult = await db.subjectresults.findAll({
        where: {
            summaryId: summaryId
        },
        include: [
            {
                model: db.subjects,
                attributes: ['factor'] 
            }
        ],
        raw: true,
    });

    for (let singleSubjectResult of subjectResult) {
        if(singleSubjectResult['averageScore']) {
            totalPoints += singleSubjectResult.averageScore*singleSubjectResult['subject.factor'];
            totalWeights += singleSubjectResult['subject.factor'];
        }
    }

    let gpa = totalPoints/totalWeights;

    await db.summaries.update({
        gpa: gpa.toFixed(2),
    },
    {
        where: {
            id: summaryId
        }
    })
    await updateTitleOfStudent(summaryId);
}

const updateBehavior = async(summaryId) => {
    let badBehaviorPoint = await db.summariesdetails.findAll({
        where: {
            summaryId: summaryId,
        },
        raw: true,
    })
    console.log(badBehaviorPoint);

    let sumBadBehaviorPoint = 0;

    for(let singleBadBehaviorPoint of badBehaviorPoint) {
        sumBadBehaviorPoint += singleBadBehaviorPoint['negativepoint'];
    }

    await db.summaries.update({
        behaviorpoint: 100 - sumBadBehaviorPoint,
    },
    {
        where: {
            id: summaryId
        }
    })
    await updateTitleOfStudent(summaryId);
}

const updateTitleOfStudent = async(summaryId) => {
    let params = await db.params.findAll({
        where: {}, raw: true,
    })
    function getParamValue(paramName) {
        for(let param of params) {
            if(param['paramName'] == paramName) {
                return param['paramValue'];
            }
        }
    }

    let summary = await db.summaries.findOne({
        where: {
            id: summaryId,
        }, 
        attributes: ['gpa', 'behaviorpoint'],
        raw: true,
    })

    let title;
    if(summary['gpa'] >= getParamValue("excellentCore") && summary['behaviorpoint'] >= getParamValue("excellentDiscipline")) {
        title = "giỏi";
    }
    else if(summary['gpa'] >= getParamValue("goodCore") && summary['behaviorpoint'] >= getParamValue("goodDiscipline")) {
        title = "khá";
    }
    else if(summary['gpa'] >= getParamValue("averageCore") && summary['behaviorpoint'] >= getParamValue("averageDiscipline")) {
        title = "trung bình";
    }
    else {
        title = "yếu";
    }
    console.log(getParamValue("excellentCore"), getParamValue("excellentDiscipline"))
    console.log(title);
    await db.summaries.update({
        title: title,
    },
    {
        where: {
            id: summaryId
        }
    })
}

module.exports = {
    totalStudentInclass,
    updateGpaFromSubjectResults,
    updateBehavior,
}