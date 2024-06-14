import { where } from "sequelize";
import db, { sequelize } from "../models/index";
import availableFunc from "../middleware/availableFunction"

const createSummaryDetailsService = async(body) => {
    try {
            let term = await availableFunc.findParamsByName("typeterm");
            let summary = await db.summaries.findOne({
                where: {
                    schoolreportId: body.schoolreportId,
                    term: term,
                }
            })
            let data = await db.summariesdetails.create({
            summaryId: summary.id,
            violaterule: body.violaterule,
            reason: body.reason,
            violateruledate: body.violateruledate,
            typeinfringeId: body.negativepoint,
        })
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

const findAllSummaryDetailsBySummaryIdService = async(summaryId) =>{
    try {
        const data = await db.summariesdetails.findAll({
            where: {
                summaryId: summaryId,
            }
        });
        if (data.length === 0) {
            return {
                EM: "summary  details not found.",
                EC: 1,
                DT: [],
            };
        }
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
        let result = await db.summariesdetails.destroy({
            where:{
                id: id
            }
        });
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

module.exports = {
    createSummaryDetailsService,
    findAllSummaryDetailsBySummaryIdService,
    deleteViolationsSummaryDetail,
}