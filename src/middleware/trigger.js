
import AsyncQueue from "sequelize/lib/dialects/mssql/async-queue";
import db, { Sequelize, sequelize } from "../models/index";
import { raw } from "body-parser";
const { Op, where } = require("sequelize");

const totalStudentInclass = async(classId) => {
    const count = await db.schoolreports.count({
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

    let summary = await db.summaries.findOne({
        where: {
            id: summaryId
        },
        raw: true,
        attributes: ['schoolreportId'],
    });
    
    let schoolreport = await db.schoolreports.findOne({
        where: {
            id: summary['schoolreportId'],
        },
        raw: true,
        attributes: ['id'],
    })
    await updateTitleSchoolreport(schoolreport['id']);
}

const updateBehavior = async(summaryId) => {
    let badBehaviorPoint = await db.summariesdetails.findAll({
        where: {
            summaryId: summaryId,
        },
        raw: true,
    })

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

    let summary = await db.summaries.findOne({
        where: {
            id: summaryId
        },
        raw: true,
        attributes: ['schoolreportId'],
    });
    
    let schoolreport = await db.findOne({
        where: {
            id: summary['schoolreportId'],
        },
        raw: true,
        attributes: ['id'],
    })
    await updateTitleSchoolreport(schoolreport['id']);
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
    await db.summaries.update({
        title: title,
    },
    {
        where: {
            id: summaryId
        }
    })
}

const updateTitleSchoolreport = async(schoolreportId) => {
    let summaries = await db.summaries.findAll({
        where: {
            schoolreportId: schoolreportId,
        },
        attributes: ['gpa', 'behaviorpoint'],
        raw: true
    });

    let total1 = 0;
    let gpatotal = 0;

    let total2 = 0;
    let behaviortotal = 0;
    for(let summary of summaries) {
        if(summary['gpa'] !== null) {
            total1 += 1;
            gpatotal += summary['gpa'];
        }
        if(summary['behaviorpoint'] !== null) {
            total2 += 1;
            behaviortotal += summary['behaviorpoint'];
        }
    }
    let lastcore = gpatotal/total1;
    let lastbehavior = behaviortotal/total2;

    await db.schoolreports.update({
        concludecore: lastcore.toFixed(2),
        concludebehaviorpoint: lastbehavior.toFixed(2),
    },
    {
        where: {
            id: schoolreportId,
        }
    })

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

    let schoolreport = await db.schoolreports.findOne({
        where: {
            id: schoolreportId,
        }, 
        attributes: ['concludecore', 'concludebehaviorpoint'],
        raw: true,
    })

    let title;
    if(schoolreport['concludecore'] >= getParamValue("excellentCore") && schoolreport['concludebehaviorpoint'] >= getParamValue("excellentDiscipline")) {
        title = "giỏi";
    }
    else if(schoolreport['concludecore'] >= getParamValue("goodCore") && schoolreport['concludebehaviorpoint'] >= getParamValue("goodDiscipline")) {
        title = "khá";
    }
    else if(schoolreport['concludecore'] >= getParamValue("averageCore") && schoolreport['concludebehaviorpoint'] >= getParamValue("averageDiscipline")) {
        title = "trung bình";
    }
    else {
        title = "yếu";
    }

    await db.schoolreports.update({
        concludetitle: title,
    },
    {
        where: {
            id: schoolreportId
        }
    })
}

module.exports = {
    totalStudentInclass,
    updateGpaFromSubjectResults,
    updateBehavior,
    updateTitleSchoolreport
}