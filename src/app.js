'use strict'

const express = require("express");
const routes = require('./routes')
const isAuth = require('./auth');


const app = express();

require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Auth with JWT middleware
app.use(isAuth({ secret: process.env.PRIVATE_KEY }).unless({ path: ['/api/login'] }));

// Routes
app.use('/api', routes);






// Turn on the server
app.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;