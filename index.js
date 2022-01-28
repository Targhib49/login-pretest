const express = require("express");
const app = express();
const { db } = require('./config');
const cors = require('cors');
const bodyParser = require("body-parser");

// app.use(cors);
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.get("/", (req,res) =>{
    res.send("Welcome to the login app API");
})

app.use('/users', require('./routes/users'));

// app.listen(3001, () => {
//     console.log("running on port 3001")});

if (db) {
    app.listen(3001, () => {
        console.log("running on port 3001")
    })
}