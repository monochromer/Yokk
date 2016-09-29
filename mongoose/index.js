var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/eop';

module.exports = function(app) {
    const mongoUrl = process.env.DB ? process.env.DB : dbURI;
    app.db = mongoose.createConnection(mongoUrl);
    app.db.on('error', console.error.bind(console, 'connection error:'));
    app.db.once('open', function() {
        console.log('App is now connected to MongoDB server');
    });

    // setting of models
    require('./models')(app, mongoose);

}
