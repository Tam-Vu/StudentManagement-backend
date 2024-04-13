import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPass) => {
  let hashPassword = bcrypt.hashSync(userPass, salt);
  return hashPassword;
};

const serviceCreateNewAccount = async (username, password, email, groupId) => {
  let hashPass = hashUserPassword(password);
  let checkUserName = {};
  let checkEmail = {};
  try {
    checkUserName = await db.User.findOne({
      where: {
        username: username,
      },
    });
    if (checkUserName) {
      return {
        EM: "Already have this username!!!",
        EC: 1,
        DT: "",
      };
    }
    checkEmail = await db.User.findOne({
      where: {
        email: email,
      },
    });
    if (checkEmail) {
      return {
        EM: "Already have this email!!!",
        EC: 1,
        DT: "",
      };
    }
    let data = await db.User.create({
      username: username,
      password: hashPass,
      email: email,
      groupId: groupId,
      isLocked: "0",
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

module.exports = {
  serviceCreateNewAccount,
  getAllUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
};
