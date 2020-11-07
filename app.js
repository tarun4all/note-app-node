require('dotenv').config();

if (!process.env.MONGO_URL) {
    console.error("Mongo URL not found. Please create dot env file beafore procedding...");
}

const mongoose = require("mongoose");

//connect Database from atlas
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/samcrit", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log(err);
    if (err) throw err;
    console.log("DB COnnected...");
});

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const { join } = require("path");

//body parser applied as middleware or json pot request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const cors = require(`cors`);
// app.use(cors());
app.use("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    console.log(req.query);
    next();
});
//accessing routes and grouping
require('./routesGroup');
app.use('/', require("./routesList"));
// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.send({ error: err.message || err });
});

app.listen(process.env.PORT || 5000, () => {
    console.log("server starts");
})