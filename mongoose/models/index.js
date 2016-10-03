// Logic here is to keep a good reference of what's used

'use strict';

const models = [
    'user',
    'task',
    'statistics'
];

// previously was in models.js in root
module.exports = function(app, mongoose) {
    models.forEach(function(element) {
        require('./' + element)(app, mongoose);
    });
};
