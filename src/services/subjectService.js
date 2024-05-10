import { where } from "sequelize";
import db, { Sequelize, sequelize } from "../models/index";

const getAllSubject = async() => {
    let data = [];
    try {
        data = await db.subjects.findAll({
            where: {
                isdeleted: 0,
            }
        });
        return {
            EM: "success",
            EC: 0,
            DT: data,
          };
    } catch (e) {
        return {
            EM: "can't find subjects",
            EC: 1,
            DT: "",
        };
    }
}

const findSubjectById = async(subjectId) => {
    let subject = {};
    try {
        subject = await db.subjects.findOne({
            where: {
              id : subjectId,
              isdeleted: 0,
            },
        });
        if (subject == null) {
            return {
                EM: "subject not found!!!",
                EC: 1,
                DT: "",
            };
        }
        return {
            EM: "success",
            EC: 1,
            DT: subject,
        }
    } catch (e) {
        return {
            EM: "can't find subjects",
            EC: 1,
            DT: "",
        };
    }
}

const createSubject = async(name, fifteenMinFactor, fourtyFiveMinFactor, finalFactor, factor) => {
    try {
        let checkSubject = await db.subjects.findOne({
            where: {
                subjectname: name,
            }
        });
        if(checkSubject != null) {
            return {
                EM: "Already have this subject!!!",
                EC: 1,
                DT: "",
            };
        }
        let newSubject = await db.subjects.create({
            subjectname: name,
            fifteenMinFactor: fifteenMinFactor,
            fourtyFiveMinFactor: fourtyFiveMinFactor,
            finalFactor: finalFactor,
            factor: factor,
            isdeleted: 0,
        });
        return {
            EM: "success",
            EC: 1,
            DT: newSubject,
        };
    } catch (e) {
        return {
            EM: "can't create subject",
            EC: 1,
            DT: "",
        };
    }
    
}

const updateSubject = async(subjectId, name, fifteenMinFactor, fourtyFiveMinFactor, finalFactor, factor) => {
    try {
        let subject = {};
        subject = await db.subjects.findOne({
            where: {
                id: subjectId,
                isdeleted: 0,
            }
        });
        if(subject != null) {
            subject = await db.subjects.update(
            {
                subjectname: name,
                fifteenMinFactor: fifteenMinFactor,
                fourtyFiveMinFactor: fourtyFiveMinFactor,
                finalFactor: finalFactor,
                factor: factor,
            }, {
                where: {
                    id: subjectId,
                }
            });
            let data = await db.subjects.findOne({

                where: {
                    id: subjectId,
                }
            })
            return {
                EM: "Update user success",
                EC: 0,
                DT: data,
            };
        } else {
            return {
                EM: "Subject not found",
                EC: 1,
                DT: "",
            };
        }
    } catch(e) {
        return {
            EM: "can't update subject",
            EC: 1,
            DT: "",
          };
    }
}

const deleteSubject = async(subjectId) => {
    try {
        let subject = {};
        subject = await db.subjects.findOne({
            where: {
                id: subjectId,
            }
        });
        if(subject != null) {
            await db.subjects.update({
                isdeleted: 1,
            }, {
                where: {
                    id: subjectId,
                }
            });
            return {
                EM: "delete subject success",
                EC: 0,
                DT: "",
              };
        } else {
            return {
                EM: "Subject not found",
                EC: 1,
                DT: "",
            };
        }
    } catch(e) {
        return {
            EM: "can't delete subject",
            EC: 1,
            DT: "",
          };
    }
}   
module.exports = {
    getAllSubject,
    createSubject,
    updateSubject,
    deleteSubject,
    findSubjectById,
}