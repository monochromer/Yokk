'use strict'

module.exports = function (schema) {

  schema.statics.read = function (companyName, cb) {
    return this.findOne({ name: companyName }, cb)
  }

  schema.statics.delete = function (companyId, cb) {
    return this.remove({ _id: companyId }, cb)
  };
}
