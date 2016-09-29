'use strict'

// element in routes Arr should match router module name which in the same directory
var routes = [
    'authorization',
    'userAPI',
    'otherRoutes'
];

module.exports = function(app, passport) {
    routes.forEach(function(element) {
        require('./' + element)(app, passport);
    });
}
