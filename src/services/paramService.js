import { Model, where } from "sequelize";
import db from "../models/index";
import availableFunc from "../middleware/availableFunction"

const updateParamService = async(data) => {
    try {
        let changeable = await availableFunc.findParamsByName("changeable");
        if (changeable == 0) {
            return {
                EM: "you can only update regulation before the term starts",
                EC: 0,
                DT: "",
            }
        }
        for (let key in data) {
            await db.params.update({
                paramValue: `${data[key]}`,
            }, {
                where: {
                    paramName: `${key}`
                }
            });
        }
        return {
            EM: "success",
            EC: 0,
            DT: "",
        };
    } catch(e) {
        return {
            EM: "can't update parameter.",
            EC: 1,
            DT: "",
        }
    }   
}

const getAllParams = async() => {
    try {
        let data = await db.params.findAll({
            where: {}
        })
        return {
            EM: "success",
            EC: 0,
            DT: data,
        };
    } catch(e) {
        return {
            EM: "can't find any parameter.",
            EC: 1,
            DT: "",
        }
    }
}

module.exports = {
    updateParamService,
    getAllParams
}