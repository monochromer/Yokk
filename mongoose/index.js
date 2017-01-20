'user strict'

const mongoose = require('mongoose');

// Use native ES6 promises
mongoose.Promise = global.Promise;

const {NODE_ENV, MONGO_URL_DEV, MONGO_URL_PROD} = process.env
const mongoUrl = (NODE_ENV === 'development' ? MONGO_URL_DEV : MONGO_URL_PROD)

module.exports = function(app) {
    app.db = mongoose.createConnection(mongoUrl)
    app.db.on('error', (err) => {
        console.log(err);
        console.log('!! Make sure your environment contains correct MONGO_URL constant and MongoDB server is running');
    });
    app.db.once('open', () => {});
    require('./models')(app, mongoose);
}
