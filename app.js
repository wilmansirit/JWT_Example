const express = require("express");


const app = express();

app.post("login", (req, res, next) => {

})

app.get("/", (req, res, next) => {

    res.send("Hola Mundo");

});




app.listen(3000, () => console.log("Server running on port 3000"));