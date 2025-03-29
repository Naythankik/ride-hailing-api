const Ride = require('../models/ride');
const User = require('../models/user');
const History = require('../models/history');

const historyResource = require('../resources/historyResource')
const rideResource = require('../resources/rideResource');

const { updateRideRequest, registerRideRequest, findRideRequest} = require('../requests/rideRequest');
const { estimatePriceByDestination, estimatePriceByTime } = require("../helper/pricing");

const registerRide = async (req, res) => {
    const { error, value } = registerRideRequest(req.body);

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    try{
        value.rider = req.payload.id;
        const rider = await Ride.create(value);

        return res.status(200).json({
            ride: rideResource(rider)
        })
    }catch(err){
        return res.status(500).json({error: err.message})
    }

}

const updateRide = async (req, res) => {
    const { error, value } = updateRideRequest(req.body);

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    try{
        const { id } = req.payload;
        await Ride.findOneAndUpdate({user: id}, value);

        return res.status(200).json({message: "Ride has been updated successfully."})
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

const findRides = async (req, res) => {
    const { error, value } = findRideRequest(req.body);

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    const { id } = req.payload;
    try{
        const { pickupLocation, destinationLocation } = value;
        let rides = await findNearbyRide(id, pickupLocation, destinationLocation, 1000);

        return res.status(200).json({
            rides: rides ? rideResource(rides) : 'No active ride found nearby.',
        })
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

const requestRide = async (req, res) => {
    const { error, value } = findRideRequest(req.body);

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    const { rideId } = req.params;
    const { id: userId } = req.payload;

    const ride = await Ride.findById(rideId);
    if (!ride) {
        return res.status(404).json({ message: 'Ride not found' });
    }

    try{
        const { pickupLocation, destinationLocation } = value;

        const request = new History({
            user: userId,
            rider: ride.rider,
            pickupLocation: { coordinates: [pickupLocation.longitude, pickupLocation.latitude] },
            destinationLocation: { coordinates: [destinationLocation.longitude, destinationLocation.latitude] },
            fare: estimatePriceByDestination(pickupLocation, destinationLocation)
        });

        await request.save();

        //send a PUSH to the driver to accept request
        return res.status(200).json({ride: historyResource(request)})
    }catch (err){
        return res.status(500).json({error: err.message})
    }
}

const cancelRequest = async (req, res) => {
    const { requestId } = req.params;

    const request = await History.findById(requestId);
    if (!request) {
        return res.status(404).json({ message: 'Request not found' });
    }

    try{
        request.status = 'canceled';
        await request.save();
        return res.status(200).json({message: 'The ride has been canceled successfully.'})
    }catch (err){
        return res.status(500).json({error: err.message})
    }
}

const readRequest = async (req, res) => {
    const { requestId } = req.params;

    const request = await History.findById(requestId)
        .populate('user', 'firstName lastName telephone')
        .select('fare destinationLocation pickupLocation');

    if (!request) {
        return res.status(404).json({ message: 'Request not found' });
    }

    return res.status(200).json({
        request: historyResource(request),
    })

}

const acceptRide = async (req, res) => {
    const { requestId, response } = req.params;

    const request = await History.findById(requestId);
    if (!request) {
        return res.status(404).json({ message: 'Request not found' });
    }

    try{
        request.status = response;
        await request.save();
        return res.status(200).json({ride: historyResource(request)})
    }catch (err){
        return res.status(500).json({error: err.message})
    }
}

const startRide = async (req, res) => {
    const { requestId } = req.params;

    const request = await History.findById(requestId);
    if (!request) {
        return res.status(404).json({ message: 'Request not found' });
    }

    try{
        request.status = 'in-progress';
        await request.save();
        return res.status(200).json({message: 'The ride has started successfully.'})
    }catch (err){
        return res.status(500).json({error: err.message})
    }
}

const completeRide = async (req, res) => {
    const { requestId } = req.params;

    let request = await History.findById(requestId);
    if (!request) {
        return res.status(404).json({ message: 'Request not found' });
    }

    try{
        const time = Date.now() - request.updatedAt;

        request.status = 'completed';
        request.fare = estimatePriceByTime(time)
        request.paymentStatus = 'paid';
        request = await request.save();
        return res.status(200).json({ride: historyResource(request)})
    }catch (err){
        return res.status(500).json({error: err.message})
    }
}

const getHistories = async (req, res) => {
    const { id } = req.payload;

    try{
        let role;
        const user = await User.findById(id);
        role = user.role === 'rider' ? 'rider' : 'user';

        const histories = await History.find({ [ role ]: id });

        return res.status(200).json({
            data: histories.length ? historyResource(histories) : []
        });
    }catch(err){
        return res.status(500).json({error: err.message})
    }

}

const findNearbyRide = async (id, start, end, distance) => {
    let ride =  await Ride.findOne({
        status: 'active',
        rider: { $ne : id},
        currentLocation: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [start.longitude, start.latitude,],
                },
                $maxDistance: distance
            }
        }
    }).populate('rider', '-password -role');

    if(!ride){
        distance += 500;
        ride = findNearbyRide(id, start, end, distance);
    }

    ride.price = estimatePriceByDestination(start, end)
    return ride;
}

module.exports = {
    registerRide,
    updateRide,
    findRides,
    requestRide,
    cancelRequest,
    acceptRide,
    readRequest,
    startRide,
    completeRide,
    getHistories
};
