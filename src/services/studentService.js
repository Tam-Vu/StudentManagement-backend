import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";

const serviceCreateNewStudent = async (
  studentname,
  birthDate,
  startDate,
  gender,
  address,
  classId,
  parentId,
  tuitionId,
  userId
) => {
  try {
    let data = await db.students.create({
      studentname: studentname,
      birthDate: birthDate,
      startDate: startDate,
      gender: gender,
      address: address,
      classId: classId,
      parentId: parentId,
      tuitionId: tuitionId,
      userId: userId,
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
                  gradeId: gradeId,
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
        let res = await db.belongtoclasses.findOne({
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
module.exports = {
  serviceCreateNewStudent,
  getAllStudentService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
  getStudentByClassnameService,
};
