import { where } from "sequelize";
import db, { sequelize } from "../models/index";


const createTuitionByClassId = async(classId, price, month, year, closingdate) => {
    try {
        let studentsTemp = await db.students.findAll({
            attributes: ['id'],
            include: [
                {
                    model: db.schoolreports,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    where: {
                        classId: classId,
                    }
                },
            ]
        });
        studentsTemp.forEach(async(student) => {
            let studentId = student.dataValues.id;
            await db.tuitions.create({
                studentId: studentId,
                price: price,
                month: month,
                year: year,
                status: 0,
                closingdate: closingdate
            })
        })
        return {
            EM: "success",
            EC: 0,
            DT: "",
          };
    }   
    catch (e) {
        console.log(e);
        return {
          EM: "can't create class tuition",
          EC: 1,
          DT: "",
        };
    }
}

// const getAllTuitionByClassId = async() => {
//     try {
//         let tuitionByClass = await db.tuitions.findAll({
//             include: [
//                 {
//                     model: db.students,
//                     attributes: ['id'],
//                     include: [
//                         {
//                             model: db.summaries,
//                             attributes: ['classId'],
//                             include: [
//                                 {
//                                     model: db.classes,
//                                     attributes: ['classname'],
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         })
//         return {
//             EM: "success",
//             EC: 0,
//             DT: tuitionByClass,
//         };
//     } catch(e) {
//         console.log(e);
//         return {
//           EM: "can't find any summaries",
//           EC: 1,
//           DT:"",
//         };
//     }
// }

const payTuition = async(tuitionId) => {
    try {
        await db.tuitions.update(
            {
                status: 1,
            },
            {
                where: {
                    id: tuitionId,
                }
            }
        );
        let data = await db.tuitions.findOne({
            where: {
                id: tuitionId,
            }
        })
        return {
            EM: "success",
            EC: 0,
            DT: data,
        };
    } catch(e) {
        console.log(e);
        return {
          EM: "can't pay this tuition",
          EC: 1,
          DT:"",
        };
    }
}

const getAllTuitionsByStudentId = async(studentId) => {
    try {
        const data = await db.tuitions.findAll({
            where: {
                studentId: studentId,
            }
        })
        return {
            EM: "success",
            EC: 0,
            DT: data,
        };
    } catch(e) {
        console.log(e);
        return {
          EM: "can't find any tuitions of this student",
          EC: 1,
          DT:"",
        };
    }
}

const getAllTuitionOfStudentInYear = async(year) => {
    try {
        let data = await db.tuitions.findAll({
            include: [
                {
                    model: db.students,
                    include: [
                        {
                            model: db.schoolreports,
                            include: [
                                {
                                    model: db.classes,
                                    include: [
                                        {
                                            model: db.grades,
                                            where: {
                                                year: year
                                            },
                                            attributes: ['year', 'gradename']
                                        }
                                    ],
                                    attributes: ['classname']
                                }
                            ],
                            attributes: ['classId']
                        }
                    ],
                    attributes: ['studentname']
                },
            ],
            where: {
                year: year,
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        })
        return {
            EM: "success",
            EC: 0,
            DT: data,
        };
    }
    catch(e) {
        console.log(e);
        return {
          EM: "can't find any tuistudents",
          EC: 1,
          DT:"",
        };
    }
}

const paySingleDebt = async(tuitionId, price, month, year, closingdate) => {
    try {
        let studentIdTemp = await db.tuitions.findOne({
            where: {
                id: tuitionId,
            },
            attributes:['studentId'],
        });
        let studentId = studentIdTemp.dataValues.studentId;
        let data = await db.tuitions.create({
            studentId: studentId,
            price: price,
            month: month,
            year: year,
            status: 0,
            closingdate: closingdate,
        });
        return {
            EM: "success",
            EC: 0,
            DT: data,
        };
    } catch(e) {
        console.log(e);
        return {
          EM: "can't create this tuition",
          EC: 1,
          DT:"",
        };
    }
}

const findAllTuitionsByStudentId = async(id) => {
    try {
        let data = await db.tuitions.findAll({
            where: {
                studentId: id,
            }
        });
        return {
            EM: "success",
            EC: 0,
            DT: data,
        };
    } catch(e) {
        console.log(e);
        return {
          EM: "can't find tuitions of this student",
          EC: 1,
          DT:"",
        };
    }
}

module.exports = {
    createTuitionByClassId,
    payTuition,
    getAllTuitionsByStudentId,
    getAllTuitionOfStudentInYear,
    paySingleDebt,
    findAllTuitionsByStudentId,
}