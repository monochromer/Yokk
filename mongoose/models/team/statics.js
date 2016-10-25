'use strict';

module.exports = function(schema) {

    schema.statics.create = function(name, cb) {
        return this.findOne({
            name: name
        }, cb)
    };

    schema.statics.read = function(name, cb) {
        if (name) {
          return this.findOne({
              name: name
          }, cb);
        }
        return this.find({}, cb);
    };

    schema.statics.update = function(name, updateObject, cb) {
        return this.findOneAndUpdate({
            name: name
        }, updateObject, {new: true}, cb)
    };

    schema.statics.delete = function(name, cb) {
        return this.remove({
            name: name
        }, cb)
    };

}
