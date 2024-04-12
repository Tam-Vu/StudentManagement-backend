import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";

const serviceCreateNewTeacher = async (data) => {
  try {
    if (
      !data.teachername ||
      !data.birthDate ||
      !data.startDate ||
      !data.gender ||
      !data.userId
    ) {
      return {
        EM: "All fields are required!!!",
        EC: 1,
        DT: [],
      };
    } else {
      let res = await db.teachers.create({
        teachername: data.teachername,
        birthDate: data.birthDate,
        startDate: data.startDate,
        gender: data.gender,
        userId: data.userId,
      });
      return {
        EM: "success",
        EC: 0,
        DT: res,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const getAllTeacherService = async () => {
  let data = [];
  try {
    data = await db.teachers.findAll();
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

const getTeacherByIdService = async (id) => {
  let data = {};
  data = await db.teachers.findByPk(id);
  return data.get({ plain: true });
};

const updateTeacherService = async (data, id) => {
  try {
    let user = await db.teachers.findOne({
      where: { id: id },
    });
    if (user) {
      await user.update({
        teachername: data.teachername,
        birthDate: data.birthDate,
        startDate: data.startDate,
        gender: data.gender,
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

const deleteTeacherService = async (id) => {
  let user = {};
  user = await db.teachers.update(
    {
      isLocked: 1,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return user.get({ plain: true });
};

module.exports = {
  serviceCreateNewTeacher,
  getAllTeacherService,
  getTeacherByIdService,
  updateTeacherService,
  deleteTeacherService,
};
