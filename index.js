'use strict'

require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('App is now connected to MongoDB server');
});

var userSchema = mongoose.Schema( require('./mongo_model') );
var User = mongoose.model('User', userSchema);

app.use( bodyParser.urlencoded({ extended: true }) );

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/new_user', function(req, res) {
    var user = new User(req.body);
        user.save(function (err, user) {
            if (err) return console.error(err);
            res.send('Created new user: ' + user.name + ' ' + user.surname + ' is saved to DB');
        });
});

const port = process.env.PORT ? process.env.PORT : 5000;

app.listen(port, () => {
  console.log('App is listening on port ' + port);
});
