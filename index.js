'use strict'

require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');


// mongoose
app.db = mongoose.createConnection(config.mongodb.uri);
app.db.on('error', console.error.bind(console, 'connection error:'));
app.db.once('open', function() {
  console.log('App is now connected to MongoDB server');
});


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
