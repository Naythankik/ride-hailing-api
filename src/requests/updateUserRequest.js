const Joi = require('joi');

module.exports = (data) => {
    return Joi.object({
        'firstName': Joi.string(),
        'lastName': Joi.string(),
        'email': Joi.string().email(),
        'telephone': Joi.string(),
        'dateOfBirth': Joi.date().less('now'),
        'role': Joi.string().valid('user', 'rider')
    }).validate(data, { abortEarly: false})
}
