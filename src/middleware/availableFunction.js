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

module.exports = {
    findParamsByName
}