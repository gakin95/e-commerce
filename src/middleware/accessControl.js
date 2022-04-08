const responseMessage = require('../helpers/responseMessages');

module.exports = {
    isAdmin: async (req, res, next) => {
        if (req.user.role !== 'Admin Authorizer' && req.user.role !== 'Admin Inputer' && req.user.role !== 'Trade Admin') 
            return responseMessage.forbidden('Access denied', res);
        next();
    },

    isAdminInputer: async (req, res, next) => {
        if (req.user.role !== 'Admin Inputer') return responseMessage.forbidden('Access denied', res);
        next();
    },

    isTradeAdmin: async (req, res, next) => {
        if (req.user.role !== 'Trade Admin') return responseMessage.forbidden('Access denied', res);
        next();
    },

    isAdminAuthorizer: async (req, res, next) => {
        if (req.user.role !== 'Admin Authorizer') return responseMessage.forbidden('Access denied', res);
        next();
    },

    isRetail: async (req, res, next) => {
        if (req.user.role !== 'Retail') return responseMessage.forbidden('Access denied', res);
        next();
    },

    isInputer: async (req, res, next) => {
        if (req.user.role !== 'Inputer') return responseMessage.forbidden('Access denied', res);
        next();
    },

    isReviewer: async (req, res, next) => {
        if (req.user.role !== 'Reviewer') return responseMessage.forbidden('Access denied', res);
        next();
    },

    isAuthorizer: async (req, res, next) => {
        if (req.user.role !== 'Authorizer') return responseMessage.forbidden('Access denied', res);
        next();
    },

    isInputerOrProcessor: async (req, res, next) => {
        if (req.user.role !== 'Inputer' && req.user.role !== 'Processor') return responseMessage.forbidden('Access denied', res);
        next();
    },
};