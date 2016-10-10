// Logic here is to keep a good reference of what's used

'use strict';

const models = [
    'user',
    'task',
    'statistics',
    'serverState'
];

// previously was in models.js in root
module.exports = (app, mongoose) => {
    models.forEach((model) => {
        require('./' + model)(app, mongoose)
    });
};
