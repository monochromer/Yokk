'use strict'

module.exports = function(app, mongoose) {
    var statistics = new mongoose.Schema({
        lastTaskNumber: {
            type: Number,
            default: 0,
        }
    });


app.db.model('statistics', statistics);
}
