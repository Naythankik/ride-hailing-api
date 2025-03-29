const { faker } = require('@faker-js/faker')
const User = require('../models/user')

const randomObjectId = async () => {
    const result = await User
        .aggregate([
            { $match: { role: { $nin : ['admin', 'user'] } } },
            { $sample: { size: 1 } }]);
    return result[0]?._id;
};

const rider = async () => {
    return {
        name: faker.vehicle.vehicle(),
        description: faker.lorem.sentence(),
        plateNumber: faker.vehicle.vrm(),
        model: faker.vehicle.model(),
        color: faker.vehicle.color(),
        rider: await randomObjectId(),
        condition: faker.helpers.arrayElement(['new', 'used', 'damaged']),
        status: faker.helpers.arrayElement(['active', 'inactive']),
        picture: faker.image.avatar(),
        currentLocation: {
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
