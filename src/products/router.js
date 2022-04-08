const express = require('express'),
    router = express.Router(),
    adminService = require('./services');

// create products
router.post('/api/createProduct', adminService.createProduct);


module.exports = router;