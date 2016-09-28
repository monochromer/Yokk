'use strict'

require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var sessions = require('express-session');
var cookieParser = require('cookie-parser');

// mongoose
const mongoUrl = process.env.DB ? process.env.DB : 'mongodb://localhost/eop';
app.db = mongoose.createConnection(mongoUrl);
app.db.on('error', console.error.bind(console, 'connection error:'));
app.db.once('open', function() {
  console.log('App is now connected to MongoDB server');
});

// setting of models
require('./models')(app, mongoose);


//middleware
app.use( bodyParser.json( {strict: true} ));
app.use( bodyParser.urlencoded( { extended: true } ));

app.use(sessions({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(cookieParser());

// setting static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

var passport = require('./userpassport')(app);
require('./routes')(app, passport);

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
  console.log('App is listening on port ' + app.get('port'));
});
