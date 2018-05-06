var express = require("express");
var app = express();
var port = process.env.PORT;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to the database
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/data");

//Create database schema
var nameSchema = new mongoose.Schema({
 first: String,
 last: String,
 email: String,
 phone: String
});

//Create a model for data
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//Create endpoint for form into database
app.post("/register", (req, res) => {
 var myData = new User(req.body);
   myData.save()
     .then(item => {
       res.send("Thank you for registering!");
     })
     .catch(err => {
       res.status(400).send("There was an error, please try again.");
     });
});


app.listen(port, () => {
 console.log("Server listening on port " + port);
});