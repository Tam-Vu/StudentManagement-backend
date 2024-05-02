import { Model } from "sequelize";
import db from "../models/index";

const updateParamService = async(name, value, note) => {
    try {
        const param = await db.params.update({
            paramName: name,
            paramValue: value,
            paramNote: note,
        });
        return {
            EM: "success",
            EC: 0,
            DT: param,
        };
    } catch(e) {
        return {
            EM: "can't update parameter.",
            EC: 0,
            DT: param,
        }
    }   
}

module.exports = {
    updateParamService
}