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

const getAllStudentService = async () => {
  let data = [];
  try {
    data = await db.students.findAll();
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

const updateStudentService = async (data, id) => {
  try {
    let user = await db.students.findOne({
      where: { id: id },
    });
    if (user) {
      await user.update({
        studentname: data.studentname,
        birthDate: data.birthDate,
        startDate: data.startDate,
        gender: data.gender,
        address: data.address,
        classId: data.classId,
        parentId: data.parentId,
        tuitionId: data.tuitionId,
        userId: data.userId,
      });
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

module.exports = {
  serviceCreateNewStudent,
  getAllStudentService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
};
