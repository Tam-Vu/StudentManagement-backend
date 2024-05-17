import jwt from "jsonwebtoken";
require("dotenv").config();

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign({payload}, key);
    } catch(e) {
        console.log(e);
    }
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch(e) {
        console.log(e);
    }
    return data;
}

module.exports = {
    createJWT, verifyToken, 
}