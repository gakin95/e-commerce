const Joi = require('@hapi/joi');

function createAdmin(admin) {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid('Admin Inputer', 'Admin Authorizer', 'Trade Admin').required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    password: Joi.string().min(4).max(15).required(),
  });

  return schema.validate(admin);
}

function phoneNumber(phone) {
  const schema = Joi.object().keys({
    phone: Joi.string().required(),
  });

  return schema.validate(phone);
}

function login(user){
  const schema = Joi.object().keys({ 
      email: Joi.string().required().email(), 
      password: Joi.string().min(4).max(15).required()
  });

  return schema.validate(user);
}

function password(user){
  const schema = Joi.object().keys({ 
    password: Joi.string().min(4).max(15).required()
  });

  return schema.validate(user);
}

module.exports = {
    createAdmin, phoneNumber, login, password
};