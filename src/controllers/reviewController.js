const errorHandler = require('../helper/error-handler');
const reviewRequest = require('../requests/reviewRequest');
const History = require('../models/history');
const User = require('../models/user');

const rateResource = async (req, res, resourceType) => {
    const { error , value } = reviewRequest(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const { rideId } = req.params;
    const { id } = req.payload
    try{
        const ride = await getResource(rideId, id);
        const resource = ride[resourceType];

        if (!resource) {
            return res.status(400).json(errorHandler({message: 'not found'}));
        }

        await calculate(resource,value.rating)

        return res.status(200).json({
            message: 'Thanks for the review!',
        })
    }catch(err){
        console.log(err);
        return res.status(500).json(errorHandler(err));
    }
}

const getResource = async (rideId, resourceId) => {
    const ride = await History.findOne({
        _id: rideId,
        $or: [
            { user: resourceId },
            { rider: resourceId }
        ]
    });
    if (!ride) {
        throw new Error('not found')
    }

     return ride;
}

const calculate = async (resourceId, value) => {
    const user = await User.findById(resourceId);

    user.ratings.numberOfRaters += 1;
    user.ratings.value += Number(value) * 0.2;
    await user.save();
}
module.exports = {
    rateUser : (req, res) => rateResource(req, res, 'user'),
    rateRider: (req, res) => rateResource(req, res, 'rider')
}
