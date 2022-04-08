const _ = require('lodash'),
    validate = require('./validation'),
    responseMessage = require('../helpers/responseMessages'),
    variables = require('../helpers/parameters'),
    helpers = require('../helpers/subroutines'),
    mongoose = require('mongoose'),
    { Products } = require('./model'),


admin = {
    createProduct: async (req, res) => {
        const { error } = validate.validateProduct(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );
    }
};

module.exports = admin;