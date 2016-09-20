'use strict'

require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var mongoose = require('mongoose');
<<<<<<< HEAD
mongoose.connect(process.env.DB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
=======


// mongoose
app.db = mongoose.createConnection('mongodb://localhost/test');
app.db.on('error', console.error.bind(console, 'connection error:'));
app.db.once('open', function() {
>>>>>>> 5bdca3d2dc8456e980d7ed5dd106d5325d01f0c2
  console.log('App is now connected to MongoDB server');
});


<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('bower_components'));
app.use(express.static('public'));
=======
// setting of models
require('./models')(app, mongoose);
>>>>>>> 5bdca3d2dc8456e980d7ed5dd106d5325d01f0c2


//middleware
app.use( bodyParser.urlencoded({ extended: true }) );


// setting static folder
app.use(express.static(path.join(__dirname, 'public')));


require('./routes')(app);


// setting up
const port = process.env.PORT ? process.env.PORT : 5000;
app.listen(port, () => {
  console.log('App is listening on port ' + port);
});
