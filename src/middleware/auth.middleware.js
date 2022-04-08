const jwt = require('jsonwebtoken');
const responseMessages = require('../helpers/responseMessages');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');  
  if (!token) return responseMessages.unauthorized('Access denied. No token provided.', res);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  }
  catch (ex) {
    console.log(ex);
    return responseMessages.notAcceptable('Invalid token.', res);
  }
};
