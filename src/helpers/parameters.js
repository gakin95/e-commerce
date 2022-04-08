//customers
const customerDetails = [
    'id', 'firstName', 'lastName', 'email', 'phone', 'profile_picture', 'isPhoneVerified', 'payment_mode'
],


//admin
 adminDetails = [
    'id', 'firstName', 'lastName', 'email', 'role', 'needsPasswordReset', 'phone', 'profile_picture', 'isEmailVerified',
],

//products
products = [
    'id', 'name', 'price', 'currency', 'picture', 'size'
];



module.exports = {
    customerDetails, adminDetails, products
};