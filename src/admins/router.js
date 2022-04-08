const express = require('express'),
   router = express.Router(),
   adminService = require('./service'),
   auth = require('../middleware/auth.middleware'),
    accessControl = require('../middleware/accessControl');


/* =====================================================================
                    Admin Management services 
   ===================================================================== */

// create Admin
router.post( '/api/createAdmin', [auth, accessControl.isAdminInputer], adminService.createAdmin);

//user login
router.post( '/api/login', adminService.login );


module.exports = router;