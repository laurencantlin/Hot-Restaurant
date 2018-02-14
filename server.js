// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// (DATA)
// =============================================================
var reservations = [{
  name: "mina",
  phone: "1234",
  email: "hello@mina.com",
  user: "m234",
}];
var waitList = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/submit", function (req, res) {
    res.sendFile(path.join(__dirname, "submit.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Get all reservations/waitlists
app.get("/reservations", function (req, res) {
    res.json(reservations);
});
app.get("/waitlist", function (req, res) {
    res.json(waitList);
});

// Create New Reservations - takes in JSON input
app.post("/api/new", function (req, res) {
    var newRes = req.body;
    console.log("NewRes",newRes);
    if (reservations.length < 5) {
        reservations.push(newRes);
        res.json(newRes);
        console.log("reservation")
    }
    else {
        waitList.push(newRes);
        res.json(newRes);
        console.log("waitList")
    }
});

app.delete('/delete', function (req, res) {
  res.send('DELETE request to homepage');
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
