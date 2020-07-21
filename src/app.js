'use strict'
const createError = require('http-errors')
const express = require("express");
const routes = require('./routes')
const isAuth = require('./auth');
const path = require('path');

const app = express();

require('dotenv').config();

// Engine views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Auth with JWT middleware
app.use(isAuth({ secret: process.env.PRIVATE_KEY }).unless({ path: ['/api/login'] }));


// Routes
app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error 404 handler
app.use(function (err, req, res, next) {

    res.status(err.status);
    res.send(err);

    // respond with json
    // if (req.is('application/json')) {
    //     res.send(err);
    //     return;
    // }

    // // respond with html page
    // if (req.accepts('html')) {
    //     res.render('404', { url: req.url, err: err })
    //     return;
    // }

});


// Turn on the server
app.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;