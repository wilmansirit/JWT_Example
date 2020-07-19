const express = require("express");
const jwt = require("jsonwebtoken");
const isAuth = require('./auth');

const app = express();

require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Auth with JWT middleware
app.use(isAuth({ secret: process.env.PRIVATE_KEY }).unless({ path: ['/login'] }))

app.post("/login", (req, res, next) => {

    if (!req.is('application/json')) {

        res.send({ "message": "Expect an applicatin/json" });

    } else {

        // request username an password from user
        const { username, password } = req.body

        // TODO fecth in database with credentials
        const user = { id: 1, username }

        // Sin with the token and send to the user
        const token = jwt.sign(user, process.env.PRIVATE_KEY, { expiresIn: '1h' });
        res.send({ "token": token });

    }

})

app.get("/", (req, res) => {

    const user = req.token
    res.send(user);

});




app.listen(3000, () => console.log("Server running on port 3000"));