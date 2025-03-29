const estimatePriceByDestination = (startingLocation, endingLocation) => {
    const toRad = (value) => value * Math.PI / 180;

    const R = 6371;
    const lat1 = startingLocation.latitude;
    const lon1 = startingLocation.longitude;
    const lat2 = endingLocation.latitude;
    const lon2 = endingLocation.longitude;

    // Calculate the difference in latitudes and longitudes
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    // Apply the Haversine formula
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c;

    // Convert distance to meters
    const distanceMeters = distanceKm * 1000;

    // Price calculation
    const pricePerMeter = 1.4;
    const totalPrice = distanceMeters * pricePerMeter;

    return totalPrice.toFixed(2);
}

const estimatePriceByTime = (time) => {
    const pricePerSecond = 1.4;
    const totalPrice = (time / 1000) * pricePerSecond;

    return totalPrice.toFixed(2);
}


module.exports = {
    estimatePriceByDestination,
    estimatePriceByTime
}
