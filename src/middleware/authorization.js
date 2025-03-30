const User = require("../models/user");

const adminAuthorization = async (req, res, next) => {
    const { email } = req.payload;
    const admin = await User.findOne({ email });
    if (!admin) {
        return res.status(401).send({ message: "Admin not found" });
    }

    if(admin.role !== "admin") {
        return res.status(401).send({ message: "Invalid role" });
    }
    next()
};

const riderAuthorization = async (req, res, next) => {
    const { email } = req.payload;
    const rider = await User.findOne({ email });
    if (!rider) {
        return res.status(401).send({ message: "Rider not found" });
    }

    if(rider.role !== "rider") {
        return res.status(401).send({ message: "Invalid role" });
    }
    next()
}

const userAuthorization = async (req, res, next) => {
    const { email } = req.payload;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send({ message: "User not found" });
    }

    if(user.role !== "user") {
        return res.status(401).send({ message: "Invalid role" });
    }
    next()
}

module.exports = {
    adminAuthorization,
    riderAuthorization,
    userAuthorization,
};
