import db, { sequelize } from "../models/index";
import bcrypt from "bcryptjs";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import multer from "multer";
import config from "../config/firebasestorage"

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPass) => {
  let hashPassword = bcrypt.hashSync(userPass, salt);
  return hashPassword;
};
// const app = initializeApp(config.firebaseConfig);
// const storage = getStorage();
// const upload = multer({ storage: multer.memoryStorage() });
// const dbImange = getFirestore(app);
const serviceCreateNewAccount = async (username, password, email, groupId) => {
    try {
        let hashPass = hashUserPassword(password);
        
        let newAccount = await db.User.create({
            username: username,
            password: hashPass,
            email: email,
            groupId: groupId,
            isLocked: 0,
        });
        return newAccount.get({plain: true});
    } catch(e) {
        return "something wrong with service";
    }
}

module.exports = {
    createAccount,
}