const Joi = require('joi');

module.exports = (data) => {
    return Joi.object({
        'email': Joi.string().email().required(),
        'password': Joi.string().required(),
    }).validate(data, { abortEarly: false})
}
