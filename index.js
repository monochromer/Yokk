'use strict'

require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sessions = require('express-session');

require('./mongoose')(app);

//middleware
app.use(bodyParser.json({ strict: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// setting static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

var passport = require('./helpers/userpassport')(app);

// router
require('./router')(app, passport);

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => console.log(`App is listening on port ${app.get('port')}`));
