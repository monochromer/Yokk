'user strict'

const mongoose = require('mongoose');

// Use native ES6 promises
mongoose.Promise = global.Promise;

module.exports = (app) => {
    app.db = mongoose.createConnection(process.env.MONGO_URL);
    app.db.on('error', (err) => {
        console.log(err);
        console.log('!! Make sure your environment contains correct MONGO_URL constant and MongoDB server is running');
    });
    app.db.once('open', () => console.log('App is now connected to MongoDB server'));
    require('./models')(app, mongoose);
}
