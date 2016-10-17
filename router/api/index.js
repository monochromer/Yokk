const express = require('express');
const api = express.Router();

require('./users')(api);
require('./timeEntries')(api);
require('./reports')(api);

module.exports = api;
