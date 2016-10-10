'use strict'

module.exports = (app, mongoose) => {
    var serverState = new mongoose.Schema({
        login: {
            type: String
        },
        numberOfDocsToSkip: Number,
        numberOfDocsToReturn: Number,
    });


    app.db.model('ServerState', serverState);
}
