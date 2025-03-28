const User = require('../models/user');
const userResource = require('../resources/userResource');
const updateUserRequest = require('../requests/updateUserRequest');
const Joi = require("joi");
const profile = async (req, res) => {
    try{
        const user = await User.findById(req.payload.id)

        return res.status(200).send({user: userResource(user)})
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "Strict",
    });

    return res.status(200).send({ message: "Successfully logged out" });
}

const update = async (req, res) => {
    const { error, value } = updateUserRequest(req.body);

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    const { id } = req.payload

    try{
        const user = await User.findByIdAndUpdate(id, value)

        return res.status(200).send({
            message: "User updated successfully",
            user: userResource(user)
        })
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

const changePassword = async (req, res) => {
    const { error, value } = Joi.object({
        'currentPassword': Joi.string().required(),
        'newPassword': Joi.string().required(),
        'confirmPassword': Joi.string().valid(Joi.ref('newPassword')).required(),
    }).validate(req.body, {abortEarly: false});

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    const { id } = req.payload

    try{
        const user = await User.findById(id)

        const doesPasswordMatch = await user.comparePassword(value.currentPassword);
        if (!doesPasswordMatch) {
            return res.status(401).send({
                message: "Invalid credentials, Try again!",
            });
        }

        user.password = value.newPassword;
        await user.save()

        return res.status(200).send({message: "Password updated successfully"})
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

module.exports = {
    profile,
    logout,
    update,
    changePassword
};
