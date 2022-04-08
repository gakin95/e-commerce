const Joi = require('@hapi/joi');

function validateProduct(product){
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().required(),
        currency: Joi.string().required(),
        picture: Joi.string().required(),
        size: Joi.string().required(),
    });
    return schema.validate(product)
}

module.exports = {
    validateProduct
}