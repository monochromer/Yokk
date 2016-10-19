'user strict'

const mongoose = require('mongoose');

// Use native ES6 promises
mongoose.Promise = global.Promise;

module.exports = function(app) {
    app.db = mongoose.createConnection(process.env.MONGO_URL);
    app.db.on('error', (err) => {
        console.log(err);
        console.log('!! Make sure your environment contains correct MONGO_URL constant and MongoDB server is running');
    });
    app.db.once('open', () => {});
    require('./models')(app, mongoose);
}
