import { where } from "sequelize";
import db, { sequelize } from "../models/index";
import availableFunc from "../middleware/availableFunction"
import middlewareTrigger from "../middleware/trigger"

const createSummaryDetailsService = async(body) => {
    try {
            let term = await availableFunc.findParamsByName("typeterm");
            let summary = await db.summaries.findOne({
                where: {
                    schoolreportId: body.schoolreportId,
                    term: term,
                }
            });
            let data = await db.summariesdetails.create({
            summaryId: summary.id,
            violaterule: body.violaterule,
            reason: body.reason,
            violateruledate: body.violateruledate,
            typeinfringeId: body.typeinfringeId,
        })
        await middlewareTrigger.updateBehavior(summary.id);
        return {
            EM: 'success.',
            EC: 0,
            DT: data
        }
    } catch(e) {
        console.log(e);
        return {
            EM: "something wrong with service",
            EC: 1,
            DT: [],
        };
    }
}

const findAllSummaryDetailsBySummaryIdService = async(schoolreportId) =>{
    try {
        let term = await availableFunc.findParamsByName("typeterm");
        let summary = await db.summaries.findOne({
            where: {
                schoolreportId: schoolreportId,
                term: term,
            }
        });
        const data = await db.summariesdetails.findAll({
            where: {
                summaryId: summary.id,
            },
            include: [
                {
                    model: db.typeinfringes,
                    attributes: ['typename', 'minuspoint'],
                }
            ]
        });
        return {
            EM: 'success.',
            EC: 0,
            DT: data,
        }
    } catch(e) {
        console.log(e);
        return {
            EM: "something wrong with service",
            EC: 1,
            DT: [],
        };
    }
}

const  deleteViolationsSummaryDetail = async (id) =>{
    try {
        let summaryDetail = await db.summariesdetails.findOne({
            where: {
                id: id
            },
        })
        console.log(summaryDetail);
        let result = await db.summariesdetails.destroy({
            where:{
                id: id
            }
            });
        await middlewareTrigger.updateBehavior(summaryDetail.summaryId);
        return {
            EM: 'success.',
            EC: 0,
            DT: '',
        }
    } catch(e) {
        console.log(e);
        return {
            EM: "something wrong with service",
            EC: 1,
            DT: [],
        };
    }
}

const getAllStudentThisYear = async() => {
    try {
        let year = await availableFunc.findParamsByName("term");
        let data = await db.schoolreports.findAll({
            attributes: { exclude: ["createdAt", "updatedAt", "statusinyear", "concludecore", "concludetitle"] },
            include: [
                {
                    model: db.students,
                    required: true,
                    include: [
                        {
                            model: db.User,
                            required: true,
                            where: {
                                isLocked: 0,
                            },
                            attributes: ['username', 'image', 'email'],
                        }
                    ],
                    attributes: { exclude: ["createdAt", "updatedAt", "statusinyear"] },
                },
                {
                    model: db.classes,
                    required: true,
                    attributes: ['classname', 'gradeId'],
                    include: [
                        {
                            model: db.grades,
                            required: true,
                            attributes: ['year', 'id', 'gradename'],
                            where: {
                                year: year,
                            }
                        }
                    ]
                }
            ]
        })
        return {
            EM: 'success.',
            EC: 0,
            DT: data,
        }
    } catch(e) {
        console.log(e);
        return {
            EM: "student not found",
            EC: 1,
            DT: [],
        };
    }
}

const getAllFringes = async() => {
    try {
        let data = await db.typeinfringes.findAll({
            where: {},
            attributes: { exclude: ["createdAt", "updatedAt"]}
        })
        return {
            EM: 'success.',
            EC: 0,
            DT: data,
        }
    } catch(e) {
        console.log(e);
        return {
            EM: "not found",
            EC: 1,
            DT: [],
        };
    }
}

module.exports = {
    createSummaryDetailsService,
    findAllSummaryDetailsBySummaryIdService,
    deleteViolationsSummaryDetail,
    getAllStudentThisYear,
    getAllFringes
}