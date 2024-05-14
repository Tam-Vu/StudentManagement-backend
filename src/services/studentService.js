import { where } from "sequelize";
import db, { sequelize } from "../models/index";
import bcrypt from "bcryptjs";
import summaries from "../models/summaries";
const excelJs = require('exceljs')
const fs = require('fs');
const { Op } = require('sequelize');


const serviceCreateNewStudent = async (studentname, birthDate, startDate, gender, address, classId, parentId, tuitionId, userId ) => {
  try {
    let data = await db.students.create({
      studentname: studentname,
      birthDate: birthDate,
      startDate: startDate,
      gender: gender,
      address: address,
      userId: userId,
      classesId: classId,
      statusinyear: 0,
    });
    return {
      EM: "success",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const getAllStudentService = async (gradeId, year) => {
  let data = [];
  try {
    data = await db.students.findAll({
      include: [
        {
          model: db.classes,
          attributes: ["classname"],
          where: {
            gradeId: {
              include: {
                model: db.grades,
                where: {
                  id: gradeId,
                  year: year,
                },
              },
            },
          },
        },
      ],
    });
    return {
      EM: "success",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 0,
      DT: data,
    };
  }
};

const getStudentByIdService = async (id) => {
  let data = {};
  data = await db.students.findByPk(id);
  return data.get({ plain: true });
};

const updateStudentService = async (data, id, btcId) => {
  try {
    let user = await db.students.findOne({
      where: { id: id },
    });
    console.log("USER: ", user.get({ raw: true }));
    if (user) {
      await user.update({
        studentname: data.studentname,
        birthDate: data.birthDate,
        gender: data.gender,
        address: data.address,
        parentId: data.parentId,
      });
      if (data.gradeId && data.classId) {
        console.log("UPDATE");
        console.log(data.gradeId, data.classId);
        let res = await db.summaries.findOne({
          where: {
            id: btcId,
          },
        });
        if (res) {
          console.log("Chay vao update");
          let check = {};
          try {
            check = await res.update({
              classId: data.classId,
            });
            console.log("CHECK: ", check.get({ raw: true }));
          } catch (error) {
            console.log(error);
            return {
              EM: "Something wrong with service",
              EC: 1,
              DT: "",
            };
          }
        }
      }
      return {
        EM: "Update user succeeds",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "User not found",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};

const deleteStudentService = async (id) => {
  try {
    let student = await db.students.findOne({
      where: {
        id: id,
      },
      include: {
        model: db.User,
      },
    });
    if (student) {
      let user = student.User;
      console.log(
        user.studentname +
          " " +
          user.id +
          " " +
          user.userId +
          " " +
          user.isLocked
      );
      await user.update({
        isLocked: 1,
      });
      return {
        EM: "Delete Succeed!!!",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "User not found!!!",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with service!!!",
      EC: 1,
      DT: "",
    };
  }
};
const getStudentByClassnameService = async (classname) => {
  let data = [];
  let checkClass = {};
  try {
    checkClass = await db.classes.findAll({
      where: {
        classname: classname,
      },
    });
    console.log(checkClass);
    if (checkClass.length === 0) {
      return {
        EM: "No class found",
        EC: 1,
        DT: "",
      };
    }
    data = await db.students.findAll({
      include: {
        model: db.classes,
        where: {
          classname: classname,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    return {
      EM: "success",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};

//lấy học sinh chưa có lớp trong năm học đang chọn 
// const getAllNonClassStudentByYear = async(year) => {
//   try{
//     let studentsInThisYear = await db.students.findAll({
//       // where:{

//       // },
//       include: [
//         {
//           model: db.summaries,
//           // where: {
//           //   studentId: db.sequelize.col("students.id"),
//           // },
//           attributes: { exclude: ["createdAt", "updatedAt"] },
//           include: [
//             {
//               model: db.classes,
//               attributes: { exclude: ["createdAt", "updatedAt"] },
//               include: [
//                 {
//                   model: db.grades,
//                   attributes: {exclude: ["createdAt","updatedAt"]},
//                   where: {
//                     year: year,
//                   }
//                 }
//               ]
//             }
//           ]
//         }
//       ],
//     })
//   return {
//     EM: "success",
//     EC: 0,
//     DT: studentsInThisYear,
//   };
//   }catch(e) {
//     console.log(e);
//     return {
//       EM: "not found",
//       EC: 1,
//       DT: "",
//     };
//   }
// }

//lấy học sinh chưa có lớp trong năm học đang chọn 
const getAllNonClassStudentByYear = async(year) => {
  try{
    console.log("hello");
    let studentsInThisYear = await sequelize.query(`select * from students where students.id not in 
    (select distinct students.id from students left join summaries on students.id = summaries.studentId left join classes 
    on classes.id = summaries.classId left join grades on classes.gradeId = grades.id where grades.year = :year)`, {
      replacements:{year},
      type: sequelize.QueryTypes.SELECT
    })
  return {
    EM: "success",
    EC: 0,
    DT: studentsInThisYear,
  };
  }catch(e) {
    console.log(e);
    return {
      EM: "not found",
      EC: 1,
      DT: "",
    };
  }
}

const getAllNonClassStudentByClassId = async(classId) => {
  try {
    let freeStudentsInThisYear = [];
    let classNameTemp = await db.classes.findByPk(classId);
    if(classNameTemp == null) {
      return {
        EM: "not found class",
        EC: 1,
        DT: "",
      };
    }
    let yearTemp = await db.grades.findOne({
      attributes:['year'],
      include:[
        {
          model: db.classes,
          where: {
            id: classId,
          }
        }
      ]
    });
    let year = yearTemp.dataValues.year;
    let className = classNameTemp.dataValues.classname;
    //lấy học sinh chưa có lớp 10: tức là chưa có bất kì học bạ nào đạt
    if(className.startsWith("10")) {
      freeStudentsInThisYear = await sequelize.query(`select distinct s.* from students s
      left join summaries su on s.id = su.studentId where su.studentId is null or not exists
      (select 1 from summaries where studentId = s.id and title <> 'yếu') and s.statusinyear = 0`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      })
    }

    //lấy học sinh chưa có lớp 10: tức là có 1 học bạ đạt
    else if(className.startsWith("11")) {
      freeStudentsInThisYear = await sequelize.query(`select distinct s.* from students s
      join summaries su on s.id = su.studentId where su.title <> 'yếu'
      group by s.id having count(*) = 1 and s.statusinyear = 0`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      })
    }

    else if(className.startsWith("12")) {
      freeStudentsInThisYear = await sequelize.query(`select distinct s.* from students s
      join summaries su on s.id = su.studentId where su.title <> 'yếu'
      group by s.id having count(*) = 2 s.statusinyear = 0`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      })
    }
    return {
      EM: "success",
      EC: 0,
      DT: freeStudentsInThisYear,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "not found",
      EC: 1,
      DT: "",
    };
  }
}

module.exports = {
  serviceCreateNewStudent,
  getAllStudentService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
  getStudentByClassnameService,
  getAllNonClassStudentByYear,
  getAllNonClassStudentByClassId
};
