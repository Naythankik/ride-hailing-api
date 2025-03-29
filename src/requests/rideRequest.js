const Joi = require('joi');

const registerRideRequest = (data) => {
    return Joi.object({
        'name': Joi.string().required(),
        'description': Joi.string().required(),
        'model': Joi.string().required(),
        'plateNumber': Joi.string().required(),
        'color': Joi.string().required(),
        'condition': Joi.string().valid('new', 'used', 'damaged'),
        'picture': Joi.string().required()
    }).validate(data, { abortEarly: false})
}

const updateRideRequest = (data) => {
    return Joi.object({
        'name': Joi.string(),
        'description': Joi.string(),
        'model': Joi.string(),
        'plateNumber': Joi.string(),
        'color': Joi.string(),
        'condition': Joi.string().valid('new', 'used', 'damaged'),
        'picture': Joi.string()
    }).validate(data, { abortEarly: false})
}

const findRideRequest = (data) => {
    return Joi.object({
        pickupLocation: Joi.object({
            latitude: Joi.number().min(-90).max(90).required(),
            longitude: Joi.number().min(-180).max(180).required(),
        }).required(),
        destinationLocation: Joi.object({
            latitude: Joi.number().min(-90).max(90).required(),
            longitude: Joi.number().min(-180).max(180).required(),
        }).required(),
    }).validate(data, { abortEarly: false });
};

module.exports = {
    registerRideRequest,
    updateRideRequest,
    findRideRequest
}

