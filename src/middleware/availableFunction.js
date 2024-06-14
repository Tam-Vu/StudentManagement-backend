import { where } from "sequelize";
import db, { Sequelize, sequelize } from "../models/index";

const findParamsByName = async(paramName) => {
    let param = await db.params.findOne({
        where: {
            paramName: paramName,
        },
        raw: true,
    })
    return param['paramValue']
}

const countStudentInClass = async(classId) => {
    let thisclass = await db.classes.findOne({
        attribute: ['total'],
        where: {
            id: classId,
        },
    });
    return thisclass['total'];
}

const countClassInGrade = async(gradeId) => {
    let count = await db.classes.count({
        where: {
            gradeId: gradeId
        }
    })
    return count;
}
module.exports = {
    findParamsByName,
    countStudentInClass,
    countClassInGrade
}