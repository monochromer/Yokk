const express = require('express');
const api = express.Router();

require('./users')(api);
require('./timeEntries')(api);
require('./reports')(api);
require('./sync')(api);
require('./teams')(api);

module.exports = api;
