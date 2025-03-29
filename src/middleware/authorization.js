const User = require("../models/user");

const adminAuthorization = async (req, res, next) => {
    const {
        headers: { authorization },
    } = req;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(400).send({ message: "Unauthorized request: No Bearer token" });
    }

    const token = authorization.substring(7);

    try {
        const { email, id, exp } = await verifyToken(token);

        const now = Date.now().valueOf() / 1000;

        if (exp < now) {
            return res.status(401).send({ message: "Token expired, please login again" });
        }

        const gracePeriod = 5 * 60;
        if (exp - now <= gracePeriod) {
            const newToken = await createToken({ email, id }, "2h");

            res.cookie("token", newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: "Strict",
            });
        }

        req.payload ={
            email,
            id
        }
        return next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).send({ message: "Token expired, please login again" });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(400).send({ message: "Invalid token, please login again" });
        }

        return res.status(500).send({ message: "Internal server error", error: err.message });
    }
};

const riderAuthorization = async (req, res, next) => {
    const { email } = req.payload;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send({ message: "User not found" });
    }

    if(user.role !== "rider") {
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
