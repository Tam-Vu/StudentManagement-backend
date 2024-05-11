import { where } from "sequelize";
import db, { sequelize } from "../models/index";


const createTuitionByClassId = async(classId, price, month, year, closingdate) => {
    let studentsTemp = await db.students.findAll({
        attributes: ['id'],
        include: [
            {
                model: db.summaries,
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
        )
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

module.exports = {
    createTuitionByClassId,
    payTuition,
    getAllTuitionsByStudentId,
}