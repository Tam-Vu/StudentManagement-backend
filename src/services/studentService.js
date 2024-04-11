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
  tuitionId
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

// const getAllUserService = async () => {
//   let users = [];
//   try {
//     users = await db.User.findAll({
//       where: {
//         isLocked: 0,
//       },
//     });
//   } catch (e) {
//     console.log(e);
//   }
//   return users;
// };

// const getUserByIdService = async (id) => {
//   let user = {};
//   user = await db.User.findOne({
//     where: {
//       id: id,
//       isLocked: 0,
//     },
//   });
//   return user.get({ plain: true });
// };

// const updateUserService = async (username, email, role, id) => {
//   let user = {};
//   user = await db.User.update(
//     {
//       username: username,
//       email: email,
//       role: role,
//     },
//     {
//       where: {
//         id: id,
//         isLocked: 0,
//       },
//     }
//   );
//   return user.get({ plain: true });
// };

// const deleteUserService = async (id) => {
//   let user = {};
//   user = await db.User.update(
//     {
//       isLocked: 1,
//     },
//     {
//       where: {
//         id: id,
//       },
//     }
//   );
//   return user.get({ plain: true });
// };

module.exports = {
  serviceCreateNewStudent,
  //   getAllUserService,
  //   getUserByIdService,
  //   updateUserService,
  //   deleteUserService,
};
