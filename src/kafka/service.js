const  { Report } = require('./models'),
validate = require('./validation'),
responseMessage = require('../helpers/responseMessages'),

report = {
    createCase: async (req, res) => {
        const { error } = validate.createReport(req.body);
        if (error) return responseMessage.badRequest( error.details[0].message, res);
        const caseIdentifier = await Report.findOne({ caseIdentifier: req.body.caseIdentifier});
        console.log("caseIdentifier....",caseIdentifier)
        if (caseIdentifier) return responseMessage.badRequest("caseIdentifier already exists.", res);
        const data = new Report(req.body);
        await data.save();
        console.log("data...",data)
        return responseMessage.created('The report was created successfully!', data, res);
    },
    addToCase: async (req, res) => {
        const { error } = validate.createReport(req.body);
        if (error) return responseMessage.badRequest( error.details[0].message, res);
        const currentCase = await Report.findOne({ caseIdentifier: req.body.caseIdentifier});
        console.log("case-----------....",currentCase)
        if (!currentCase) return responseMessage.badRequest('Invalid case.', res);
        //console.log("res.body.kafkaMessage....",req.body.kafkaMessage)
        currentCase.findOneAndUpdate(
            { caseIdentifier: req.body.caseIdentifier },
            { $push: { kafkaMessage: req.body.kafkaMessage } },
          ).exec();
         console.log("currentCase",currentCase)
         //await report.save();
        // console.log("data...",data)
        return responseMessage.success('The report was created successfully!', report, res);
    },
};

module.exports = report;