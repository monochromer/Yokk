'use strict'

module.exports = function (schema) {

  schema.statics.read = function (companyId, cb) {
    return this.findOne({ _id: companyId }, cb)
  }

  schema.statics.delete = function (companyId, cb) {
    return this.remove({ _id: companyId }, cb)
  };
}
