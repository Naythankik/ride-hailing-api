const historyResource = (history) => {
    return {
        id: history._id,
        rider: history.rider,
        user: history.user,
        pickupLocation: history.pickupLocation,
        destinationLocation: history.destinationLocation,
        fare: history.fare,
        status: history.status,
        paymentStatus: history.paymentStatus,
        createdAt: history.createdAt ?? null,
        updatedAt: history.updatedAt ?? null
    }
}

module.exports = (histories) => {
    return histories.length > 1 ? histories.map(history => historyResource(history)) : historyResource(histories)
};
