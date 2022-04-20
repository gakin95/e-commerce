const Joi = require('@hapi/joi');

function createReport(report) {
  const schema = Joi.object().keys({
    caseIdentifier: Joi.string().required(),
    offset: Joi.string().required(),
    Status: Joi.string(),
    partition: Joi.number().required(),
    kafkaMessage: Joi.allow()
  });

  return schema.validate(report);
}

module.exports = {
    createReport
};