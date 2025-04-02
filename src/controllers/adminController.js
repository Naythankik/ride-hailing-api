const userResource = require("../resources/userResource");
const historyResource = require("../resources/historyResource");
const rideResource = require("../resources/rideResource");
const errorHandler = require("../helper/error-handler");

const User = require("../models/user");
const History = require("../models/history");
const Ride = require("../models/ride");

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
        return res.status(500).json(errorHandler(error));
    }
}

const getAllRides = async (req, res) => {
    const { id } = req.payload;
    try{
        const { page = 1, limit = 30 } = req.query;
        const skip = (page - 1) * limit;
        const query = {_id: {$ne : id}, role: {$ne: 'admin'} };

        const rides = await Ride.find(query).populate('rider', '-password -isVerified -role -dateOfBirth').skip(skip).limit(limit);
        return res.status(200).json({
            totalUsers: await Ride.find(query).countDocuments(),
            perPage: limit,
            pageNumber: page,
            data: rideResource(rides),
        });
    }catch(error){
        console.error(error);
        return res.status(500).send(errorHandler(error));
    }
}

const getAUser = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findById(id);
        const role = user.role === 'rider' ? 'rider' : 'user';
        const histories = await History.find({ [ role ]: user._id }).
        populate(`${user.role !== 'rider' ? 'rider' : 'user'}`, '-password -isVerified -role -dateOfBirth -ratings -status');

        return res.status(200).json({
            user: userResource(user),
            rides: historyResource(histories)
        });
    }catch(error){
        return res.status(500).json(errorHandler(error));
    }
}

const getARide = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await Ride.findById(id).populate('rider', '-password -isVerified -role -dateOfBirth');

        return res.status(200).json({ride: rideResource(user)});
    }catch(error){
        return res.status(500).json(errorHandler(error));
    }
}

const blockUser = async (req, res) => {
    const { userId } = req.params;
    const { id: adminId } = req.payload;

    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json(errorHandler({message:'not found'}));
        }

        await superAdminAction(user, adminId)

        user.status = 'blocked';
        await user.save();
        return res.status(200).send({message: 'User has been blocked successfully'});
    }catch(error){
        return res.status(500).json(errorHandler(error));
    }
}

const deleteUser = async (req, res) => {
    const { userId } = req.params;
    const { id: adminId } = req.payload;

    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json(errorHandler({message: 'not found'}));
        }

        await superAdminAction(user, adminId)
        await user.deleteOne();

        return res.status(200).send({message: 'User has been deleted successfully'});
    }catch(error){
        return res.status(403).json(errorHandler(error));
    }
}

const superAdminAction = async (user, adminId) => {
    if (user.role === 'admin') {
        const superAdmin = await User.findById(adminId);

        if (!superAdmin) {
            throw new Error('not found');
        }

        if (superAdmin.role !== 'super-admin') {
            throw new Error('Super Authorized access');
        }
    }
}

module.exports = {
    getAllUsers,
    getAUser,
    getAllRides,
    getARide,
    blockUser,
    deleteUser,
}
