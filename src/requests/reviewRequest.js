const Joi = require('joi');

module.exports = (data) => {
    return Joi.object({
        'rating': Joi.number().min(1).max(5).required(),
    }).validate(data, { abortEarly: false})
}

