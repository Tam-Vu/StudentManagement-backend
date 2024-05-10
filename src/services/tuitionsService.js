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
        const studentId = student.dataValues.id;
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

const changeTuitionByClassId = async(tuitionId, price, month, year, closingdate) => {
    
}
module.exports = {
    createTuitionByClassId,
}