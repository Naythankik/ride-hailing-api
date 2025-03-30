const { default: mongoose } = require("mongoose");

const History = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    pickupLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    destinationLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    fare: {
        type: Number,
    },
    status: {
        type: String,
        required: false,
        enum: ['requested', 'accepted', 'in-progress', 'rejected', 'completed', 'canceled'],
        default: 'requested',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'cash'],
        default: 'cash',
    },
}, {timestamps: true});

History.index({ pickupLocation: '2dsphere', destinationLocation: '2dsphere' });


module.exports = mongoose.model("History", History);
