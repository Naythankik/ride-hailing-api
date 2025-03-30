const userResource = require("../resources/userResource");
const historyResource = require("../resources/historyResource");

const User = require("../models/user");
const History = require("../models/history");

const getAllUsers = async (req, res) => {
    const { id } = req.payload;
    try{
        const { page = 1, limit = 30 } = req.query;
        const skip = (page - 1) * limit;
        const query = {_id: {$ne : id}, role: {$ne: 'admin'} };

        const users = await User.find(query).skip(skip).limit(limit);
        return res.status(200).json({
            totalUsers: await User.find(query).countDocuments(),
            perPage: limit,
            pageNumber: page,
            data: userResource(users),
        });
    }catch(error){
        console.error(error);
        return res.status(500).send({message: 'Something went wrong'});
    }
}

const getAUser = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findById(id);
        const role = user.role === 'rider' ? 'rider' : 'user';
        const histories = await History.find({ [ role ]: user._id }).
        populate(`${user.role !== 'rider' ? 'rider' : 'user'}`, '-password -isVerified -role -dateOfBirth');

        return res.status(200).json({
            user: userResource(user),
            rides: historyResource(histories)
        });
    }catch(error){
        console.error(error);
        return res.status(500).send({message: 'Something went wrong'});
    }
}

module.exports = {
    getAllUsers,
    getAUser
}
