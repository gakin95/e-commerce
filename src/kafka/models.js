const mongoose = require('mongoose'),
    { Schema } = mongoose,

reportSchema = new Schema(
    {
        name: String
    },
    { strict: false}
);

const Report = mongoose.model('report', reportSchema);
exports.Report = Report;
