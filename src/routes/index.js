'use strict'

const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router()


router.get("/", (req, res) => {

    const user = req.token
    res.send(user);

});

router.post("/login", (req, res, next) => {

    if (!req.is('application/json')) {

        res.send({ "message": "Expect an applicatin/json" });

    } else {

        // request username an password from user
        const { username, password } = req.body

        // TODO fecth in database with credentials
        const user = { id: 1, username }

        // Sign with the token and send to the user
        const token = jwt.sign(user, process.env.PRIVATE_KEY, { expiresIn: '1h' });
        res.send({ "token": token });

    }

})


module.exports = router;