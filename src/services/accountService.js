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
            role: role
        });
    } catch(e) {
        console.log(e);
    }
}

module.exports = {
    serviceCreateNewAccount,
};