import db from "../models/index";

const createNewClassService = async(classname, homeroomTeacher, gradeId) => {
    try {
        let data = db.classes.create({
            classname: classname,
            total: 0,
            classMonitor: null,
            homeroomTeacher: homeroomTeacher,
            gradeId: gradeId
        });
        return {
            EM: "success",
            EC: 0,
            DT: data,
          };
    } catch(e) {
        console.log(e);
        return {
            EM: "something wrong with service",
            EC: 0,
            DT: '',
        };
    }
}

const getAllClassService = async() => {
    try {
        let data = db.classes.findAll();
        return {
            EM: "success",
            EC: 0,
            DT: data,
        };
    } catch(e) {
        console.log(e);
        return {
            EM: "something wrong with service",
            EC: 1,
            DT: '',
        };
    }
}

module.exports = {
    createNewClassService,
    getAllClassService,
}