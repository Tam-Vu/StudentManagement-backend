import db from "../models/index";
import bcrypt from 'bcryptjs';

class AccountService {
    salt = bcrypt.genSaltSync(10);
    
    hashUserPassword = (userPass) => {
        let hashPassword = bcrypt.hashSync(userPass, salt);
        return hashPassword;
    }
    
    serviceCreateNewAccount = async(username, password, email, role) => {
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
}

module.exports = new AccountService();