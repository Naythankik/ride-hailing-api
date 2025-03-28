const registerRequest = require('../requests/registerRequest')
const loginRequest = require('../requests/loginRequest')
const User = require('../models/user');
const Token = require('../models/token');
const userResource = require('../resources/userResource');
const { generateOTP, generateToken, createAccessToken} = require("../helper/token");
const { sendMail, getMessageTemplate } = require("../helper/mail");

const register = async (req, res) => {
    const { error, value } = registerRequest(req.body);
    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    try {
        const user = await User.findOne({email: value.email})

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User(value);

        if(newUser){
            try {
                const token = await Token.create({
                    otp: await generateOTP(),
                    token: generateToken(),
                    userId: newUser._id,
                    expiresIn: Date.now() + 10 * 60 * 1000
                });

                const subject = 'Email Verification'
                const header = 'Your One-Time Password (OTP)';
                const content = 'We received a request to verify your account with a one-time password (OTP). Please use the following code to complete your verification:';
                const warning = 'This OTP is valid for 10 minutes only.';

                await sendMail(newUser.email, subject, getMessageTemplate(
                    header,
                    content,
                    warning,
                    token.otp
                ));
            }catch (e){
                console.error(e)
                return res.status(422).json({ message: e.message });
            }
        }

        await newUser.save();

        return res.status(200).json({
            message: "An OTP has been sent to the provided email for verification",
            admin: userResource(newUser),
        })
    } catch (err) {
        console.error(error);
        return res.status(500).send({
            message: err.message,
        });
    }
}

const login = async (req, res) => {
    const { error, value } = loginRequest(req.body);

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    try {
        const {email, password} = value;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid credentials, Try again!" });
        }

        const doesPasswordMatch = await user.comparePassword(password);
        if (!doesPasswordMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid credentials, Try again!",
            });
        }

        if (!user.isVerified) {
            return res.status(401).json({ success: false, message: "User account has not been verified" });
        }

        user.password = undefined;

        const token = await createAccessToken({ email: user.email, id: user._id }, "3h");

        return res.status(200).send({
            access_token : token,
            admin: userResource(user)
        });
    }catch (error) {
        console.error(error);
        return res.status(400).send(error.message);
    }
}

module.exports = {
    register,
    login
};
