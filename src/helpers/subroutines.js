const jwt = require('jsonwebtoken'),
    Chance = require('chance'),
    chance = new Chance();

require('dotenv').config();

function generateAuthToken(user) {
    const token = jwt.sign({_id: user.id, role: user.role}, process.env.JWT_SECRET);
    return token;
}

function generateEmailVerificationToken(email) {
    const token = jwt.sign({email: email}, process.env.JWT_SECRET);
    return token;
}

function generateOTP() {
    return chance.string({ length: 4, alpha: false, numeric: true });
}

//add days to date
Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};
// use this variable only when you want to add days or remove days from a date. Otherwise, use the normal new Date()
let getCurrentDate = new Date();

module.exports = {
    generateAuthToken,
    generateEmailVerificationToken,
    generateOTP,
    getCurrentDate
}