import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";
import { createJWT } from "../middleware/jwtService";
import { access } from "fs";
import { group } from "console";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPass) => {
  let hashPassword = bcrypt.hashSync(userPass, salt);
  return hashPassword;
};

const checkPass = (inputPass, hashPass) => {
  return bcrypt.compareSync(inputPass, hashPass);
};

const serviceCreateNewAccount = async (username, password, email, groupId) => {
  let hashPass = hashUserPassword(password);
  let checkUserName = {};
  let checkEmail = {};
  try {
    // checkUserName = await db.User.findOne({
    //   where: {
    //     username: username,
    //   },
    // });
    // if (checkUserName) {
    //   return {
    //     EM: "Already have this username!!!",
    //     EC: 1,
    //     DT: "",
    //   };
    // }
    // checkEmail = await db.User.findOne({
    //   where: {
    //     email: email,
    //   },
    // });
    // if (checkEmail) {
    //   return {
    //     EM: "Already have this email!!!",
    //     EC: 1,
    //     DT: "",
    //   };
    // }
    let data = await db.User.create({
      username: username,
      password: hashPass,
      email: email,
      groupId: groupId,
      isLocked: 0,
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

const getAllUserService = async () => {
  let users = [];
  try {
    users = await db.User.findAll({
      where: {
        isLocked: 0,
      },
    });
  } catch (e) {
    console.log(e);
  }
  return users;
};

const getUserByIdService = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: {
      id: id,
      isLocked: 0,
    },
  });
  return user.get({ plain: true });
};

const updateUserService = async (username, email, groupId, id) => {
  let user = {};
  user = await db.User.update(
    {
      username: username,
      email: email,
      groupId: groupId,
    },
    {
      where: {
        id: id,
        isLocked: 0,
      },
    }
  );
  return user.get({ plain: true });
};

const deleteUserService = async (id) => {
  let user = {};
  user = await db.User.update(
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

const loginService = async (rawUsername, rawPass) => {
  try {
    let user = await db.User.findOne({
      where: {
        username: rawUsername,
      },
      include: [
        {
          model: db.students,
          attribute: ["id"],
        },
        {
          model: db.teachers,
          attribute: ["subjectId", "id"],
        },
      ],
    });
    if (user) {
      user = user.get({ plain: true });
      let isCorrectPass = checkPass(rawPass, user.password);
      if (isCorrectPass) {
        let payload = {};
        if (user.teacher !== null) {
          payload = {
            id: user.id,
            role: user.groupId,
            teacherId: user.teacher.id,
            subjectId: user.teacher.subjectId,
          };
        } else if (user.student !== null) {
          payload = {
            id: user.id,
            role: user.groupId,
            studentId: user.student.id,
          };
        } else {
          payload = {
            id: user.id,
            role: user.groupId,
          };
        }
        let tokenJson = {
          username: user.username,
          email: user.email,
          role: user.groupId,
        }
        let token = createJWT(tokenJson);
        return {
          EM: "success",
          EC: 0,
          DT: {
            token,
            payload,
          },
          // DT: token,
        };
      } else {
        return {
          EM: "invalid username or password",
          EC: 0,
          DT: "",
        };
      }
    } else {
      return {
        EM: "invalid username or password",
        EC: 0,
        DT: "",
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "server error",
      EC: 1,
      DT: "",
    };
  }
};

const changePassService = async(userId, oldPassword, newPassword, retypeNewPassword) => {
  try {
    let user = await db.User.findOne({
      where: {
        id: userId,
      }
    })
    if (user == null) {
      return {
        EM: "user not found",
        EC: 1,
        DT: "",
      };
    }

    let isCorrectPass = checkPass(oldPassword, user.password);
    if (isCorrectPass == false) {
      return {
        EM: "wrong password",
        EC: 1,
        DT: "",
      };
    }
    if (newPassword !== retypeNewPassword) {
      return {
        EM: "retype new password doesn't match new password",
        EC: 1,
        DT: "",
      };
    }
    let hashPass = hashUserPassword(newPassword);
    await db.User.update({
      password: hashPass,
    }, {
      where: {
        id: userId,
      }
    })
    return {
      EM: "success",
      EC: 0,
      DT: "",
    };
  } catch(e) {
    console.log(e);
    return {
      EM: "server error",
      EC: 1,
      DT: "",
    };
  }
}

module.exports = {
  serviceCreateNewAccount,
  getAllUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  loginService,
  changePassService
};
