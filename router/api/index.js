const express = require('express');
const api = express.Router();

require('./users')(api);
require('./timeEntries')(api);

module.exports = api;
