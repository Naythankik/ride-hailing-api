const { default: mongoose } = require("mongoose");

const Ride = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    plateNumber: {
        type: String,
        required: true,
        unique: true,
    },
    model: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        enum: ['new', 'used', 'damaged'],
        required: false
    },
    rider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: false,
        enum: ['active', 'inactive'],
        default: 'active',
        // enum: ['requested', 'accepted', 'in-progress', 'rejected', 'completed'],
    },
    picture: {
        type: String,
        required: true,
        default: 'picture.png',
    },
    currentLocation: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
}, {timestamps: true});

Ride.index({ currentLocation: '2dsphere' });


module.exports = mongoose.model("Ride", Ride);
