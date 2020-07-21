'use strict'

const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const createError = require('http-errors')


router.get("/", (req, res, next) => {

    // If not JSON is received
    if (!req.is('application/json')) return next(createError(400, "Expect an application/json"));

    const user = req.token
    res.send(user);

});

router.get("/login", (req, res, next) => {

    res.render('login');

})



router.post("/login", (req, res, next) => {

    // If not JSON is received
    if (!req.is('application/json')) return next(createError(400, "Expect an application/json"));

    // request username an password from user
    const { username } = req.body

    // TODO fecth in database with credentials
    const user = { id: 1, username }

    // Sign with the token and send to the user
    const token = jwt.sign(user, process.env.PRIVATE_KEY, { expiresIn: '1h' });
    res.send({ "token": token });

})



module.exports = router;