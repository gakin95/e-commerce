const express = require('express'),
router = express.Router(),
   reportService = require('./service');


/* =====================================================================
                    Admin Management services 
   ===================================================================== */


//create report
router.post( '/api/create', reportService.createCase );
router.put( '/api/updateCase', reportService.addToCase );


module.exports = router;