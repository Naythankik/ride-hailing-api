const Joi = require('joi');

module.exports = (data) => {
    return Joi.object({
        'firstName': Joi.string().required(),
        'lastName': Joi.string().required(),
        'email': Joi.string().email().required(),
        'telephone': Joi.string().required(),
        'password': Joi.string().min(8).required(),
        'dateOfBirth': Joi.date().less('now').required(),
        'role': Joi.string().valid('user', 'rider').required()
    }).validate(data, { abortEarly: false})
}
