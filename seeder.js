const userFactory = require('./src/factories/userFactory');
const rideFactory = require('./src/factories/rideFactory');
const historyFactory = require('./src/factories/historyFactory');

const User = require('./src/models/user');
const Ride = require('./src/models/ride');
const History = require('./src/models/history');

require('dotenv').config();
const connection = require("./config/database");
connection();

// Seeder functions
const seederUsers = async () => {
    const users = await userFactory(20);
    try {
        await User.insertMany(users);
        console.log('Users seeded successfully');
    } catch (err) {
        console.error('Error seeding users:', err);
        throw err;
    }
};

const seederRides = async () => {
    const rides = await rideFactory(20);
    try {
        await Ride.insertMany(rides);
        console.log('Riders seeded successfully');
    } catch (err) {
        console.error('Error seeding riders:', err);
        throw err;
    }
};

const seederHistory = async () => {
    const rides = await historyFactory(50);
    try {
        await History.insertMany(rides);
        console.log('History seeded successfully');
    } catch (err) {
        console.error('Error seeding histories:', err);
        throw err;
    }
};

const runSeeders = async () => {
    try {
        await seederUsers();
        await seederRides();
        await seederHistory();
        console.log('All seeders completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeder error:', err);
        process.exit(1);
    }
};

runSeeders();
