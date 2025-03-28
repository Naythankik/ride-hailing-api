const crypto = require("crypto");
const Token = require('../models/token');
const generateOTP = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const checkToken = await Token.findOne({otp: otp});
    if(checkToken) {
        return generateOTP();
    }
    return otp.toString();
}

const generateToken = () => {
    return crypto.randomBytes(16).toString("hex");
}

module.exports = {
    generateOTP,
    generateToken
};
