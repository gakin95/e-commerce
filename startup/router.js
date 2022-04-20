const express = require('express'),
    bodyParser = require('body-parser'),
    errorHandler = require('../src/helpers/errorHandler'),
    adminRouter = require('../src/admins/router'),
    productRouter = require('../src/products/router');
    const reportRouter = require('../src/kafka/router');

module.exports = function (app) {
    app.use(express.json({ limit:"5mb" }));
    app.use(bodyParser.urlencoded({ limit:"5mb", extended: true }));
    app.use(errorHandler);                        

    app.use('/', express.Router().get("/api_v1/welcome", (req, res) => res.status(200).json({ 
        message: "Hi, I am Yango.. and you are in my world!." })
    ));
    app.use('/admins', adminRouter);
    app.use('/admins', productRouter);
    app.use('/report', reportRouter);

    //add Central error handling below
};