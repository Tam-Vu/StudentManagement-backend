import { where } from "sequelize";
import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPass) => {
    let hashPassword = bcrypt.hashSync(userPass, salt);
    return hashPassword;
}

const serviceCreateNewAccount = async(username, password, email, role) => {
    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            username: username,
            password: hashPass,
            email: email, 
            role: role,
            isLocked: "0"
        });
    } catch(e) {
        console.log(e);
    }
}

const getAllUserService = async() => {
    let users = [];
    try {
        users = await db.User.findAll({
            where: {
                isLocked: 0
            }
        });
    } catch (e) {
        console.log(e);
    }
    return users;
}

const getUserByIdService = async(id) => {
    let user = {};
    user = await db.User.findOne({
        where:{
            id: id,
            isLocked: 0
        }
    })
    return user.get({plain: true});
}

const updateUserService = async(username, email, role, id) => {
    let user = {};
    user = await db.User.update({
        username: username,
        email: email,
        role: role
    },{
        where: {
            id: id,
            isLocked: 0
        }
    })
    return user.get({plain: true});
}

const deleteUserService = async(id) => {
    let user = {};
    user = await db.User.update({
        isLocked: 1
    }, {
        where: {
            id: id,
        }
    })
    return user.get({plain: true});
}

module.exports = {
    serviceCreateNewAccount,
    getAllUserService,
    getUserByIdService,
    updateUserService,
    deleteUserService
};