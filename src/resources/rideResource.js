const rideResource = (ride) => {
    return {
        id: ride._id,
        name: ride.name,
        description: ride.description,
        model: ride.model,
        plateNumber: ride.plateNumber,
        color: ride.color,
        condition: ride.condition,
        location: ride.currentLocation,
        rider: ride.rider,
        picture: ride.picture,
        price: ride.price ?? null,
        createdAt: ride.createdAt ?? null,
        updatedAt: ride.updatedAt ?? null
    }
}

module.exports = (rides) => {
    return rides.length > 1 ? rides.map(ride => rideResource(ride)) : rideResource(rides)
};
