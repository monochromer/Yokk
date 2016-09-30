const mongoose = require('mongoose');

module.exports = function(app) {
    app.db = mongoose.createConnection(process.env.MONGO_URL);
    app.db.on('error', function(err){
      console.log(err);
      console.log('!! Make sure your environment contains correct MONGO_URL constant');
    });
    app.db.once('open', function() {
        console.log('App is now connected to MongoDB server');
    });

    // setting of models
    require('./models')(app, mongoose);

}
