'use strict'

require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');


// mongoose
app.db = mongoose.createConnection('mongodb://localhost/eop');
app.db.on('error', console.error.bind(console, 'connection error:'));
app.db.once('open', function() {
  console.log('App is now connected to MongoDB server');
});


// setting of models
require('./models')(app, mongoose);


//middleware
app.use( bodyParser.json( {strict: true} ) );


app.use( bodyParser.json( {strict: true} ) );

// setting static folder
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));


require('./routes')(app);


// setting up
const port = process.env.PORT ? process.env.PORT : 5000;
app.listen(port, () => {
  console.log('App is listening on port ' + port);
});
