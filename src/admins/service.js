const _ = require('lodash'),
    bcrypt = require('bcrypt'),
    validate = require('./validation'),
    responseMessage = require('../helpers/responseMessages'),
    variables = require('../helpers/parameters'),
    helpers = require('../helpers/subroutines'),
    mailService = require('../helpers/mailServices'),

    { Admin } = require('./model'),

admin = {
    createAdmin: async (req, res) => {
        const { error } = validate.createAdmin(req.body);
        if (error) return responseMessage.badRequest( error.details[0].message, res);

        const email = await Admin.findOne({ email: req.body.email, isDeleted: false});
        if (email) return responseMessage.badRequest("Email already exists.", res);

        const admin = new Admin(_.pick(req.body, variables.adminDetails));
        admin.email = admin.email.toLowerCase();
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(req.body.password, salt);
        admin.passwordResetToken_token_expires_on = helpers.getCurrentDate.addDays(1);
        await admin.save();

        mailService.sendAdminChangePasswordEmail(admin);
        const data = _.pick(admin, variables.adminDetails);
        return responseMessage.created('The new admin was created successfully!', data, res);
    },

    login: async (req, res) =>{
        const { error } = validate.login(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        const admin = await Admin.findOne({email: req.body.email.toLowerCase(), isDeleted: false});
        if (!admin) return responseMessage.badRequest( 'Invalid email or password', res );

        const validPassword = await bcrypt.compare(req.body.password, admin.password);
        if (!validPassword) return responseMessage.badRequest( 'Invalid email or password', res );

        const data = _.pick(admin, variables.adminDetails);
        const token = helpers.generateAuthToken(admin);

        if (admin.isEmailVerified) return responseMessage.successfulLogin( token, 'You have logged in successfully!', data, res );  
        return responseMessage.partialContent( 'Please verify your email address', data, res );
    },

    verifyEmail: async (req, res) => {
        let admin = await Admin.findOne({
            email_verification_token: req.params.token, 
            email_verification_token_expires_on:  {$gte: Date.now()},
            isDeleted: false
        });
        if(!admin) return responseMessage.badRequest('Invalid or expired token.', res);

        admin.isEmailVerified = true;
        admin.email_verification_token = null;
        admin.email_verification_token_expires_on = null;
        await admin.save();

        const data = _.pick(admin, variables.adminDetails);
        const token = helpers.generateAuthToken(admin);
        return responseMessage.successfulLogin( token, 'Your email has been verified successfully!.', data, res );
    },    

    regenerateEmailVerificationMail: async (req, res) => {
        if(!req.body.email || !req.body.email.match(validEmail)) return responseMessage.badRequest( "Please enter a valid email", res );

        const admin = await Admin.findOne({email: req.body.email.toLowerCase(), isDeleted: false});      
        if(!admin) return responseMessage.badRequest( 'Sorry, this email does not exist in our records', res );
        if(admin.isEmailVerified == true) return responseMessage.badRequest( 'You have already verified your email address', res );
        
        admin.email_verification_token = helpers.generateEmailVerificationToken(admin.email);
        admin.email_verification_token_expires_on = helpers.getCurrentDate.addDays(1);  //expires in 1 day
        await admin.save();

        // mailService.sendVerificationEmail(admin);  ***** TO DO ******
        return responseMessage.success('A new verification email has been sent to your email inbox. Please check your mail and follow the instructions therein to confirm your account', null, res);
    },

    updateAdminRole: async(req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.adminId)) return responseMessage.notFound('Invalid user.', res);
        const admin = await Admin.findOne({id: req.params.adminId, isDeleted: false});
        if(!admin) return responseMessage.badRequest('Invalid user.', res);

        admin.role = req.body.role;
        await admin.save();

        const data = _.pick(admin, variables.adminDetails);
        return responseMessage.success('Admin role updated successfully!', data, res);
    },

    delete: async(req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.adminId)) return responseMessage.notFound('Invalid user.', res);
        const admin = await Admin.findOne({ _id: req.params.adminId, isDeleted:false });
        if(!admin) return responseMessage.badRequest('Invalid user.', res);

        admin.isDeleted = true;
        await admin.save();

        return responseMessage.success('Admin deleted successfully!', null, res);
    },

    forgotPassword: async (req, res) => {
        if(!req.body.email || !req.body.email.match(validEmail)) return responseMessage.badRequest( "Please enter a valid email", res );
        let admin = await Admin.findOne({email: req.body.email.toLowerCase(), isDeleted: false});
        if(!admin) return responseMessage.badRequest( 'Invalid user.', res );

        admin.passwordResetToken = helpers.generateEmailVerificationToken(admin.email);
        admin.passwordResetToken_expires_on = helpers.getCurrentDate.addDays(1);  //expires in 1 day
        await admin.save();
        
        mailService.sendAdminPasswordResetEmail(admin);
        return responseMessage.success('Please check your mail for the details of the next step.', null, res);
    },

    resetPassword: async (req, res) => {
        const { error } = validate.password(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        const admin = await Admin.findOne({passwordResetToken: req.params.token, passwordResetToken_expires_on: {$gte: Date.now()} });
        if(!admin) return responseMessage.badRequest('Invalid or expired token', res);

        const salt = await bcrypt.genSalt(10);        
        admin.password = await bcrypt.hash(req.body.password, salt);
        admin.passwordResetToken = null;
        admin.passwordResetToken_expires_on = null;
        admin.needsPasswordReset = false;
        admin.isEmailVerified = true;
        await admin.save();

        const token = helpers.generateAuthToken(admin);
        const data = _.pick(admin, variables.adminDetails);
        return responseMessage.successfulLogin( token, 'Your password has been updated successfully!.', data, res );
    },
};

module.exports = admin;