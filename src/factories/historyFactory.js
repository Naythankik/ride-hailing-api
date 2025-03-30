const { faker } = require('@faker-js/faker')
const User = require('../models/user')

const randomObjectId = async (role) => {
    const result = await User
        .aggregate([
            { $match: { role: role } },
            { $sample: { size: 1 } }]);
    return result[0]?._id;
};

const rider = async () => {
    return {
        user: await randomObjectId('user'),
        rider: await randomObjectId('rider'),
        paymentStatus: faker.helpers.arrayElement(['pending', 'paid']),
        paymentMethod: faker.helpers.arrayElement(['card', 'cash']),
        status: faker.helpers.arrayElement(['requested', 'accepted', 'in-progress', 'rejected', 'completed', 'canceled']),
        fare: faker.finance.amount(),
        pickupLocation: {
            type: 'Point',
            coordinates: [faker.location.longitude(), faker.location.latitude()]
        },
        destinationLocation: {
            type: 'Point',
            coordinates: [faker.location.longitude(), faker.location.latitude()]
        },
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
    }
}

module.exports = async (count) => {
    const riders = [];

    for (let i = 0; i < count; i++) {
        riders.push(await rider());
    }
    return riders
}
