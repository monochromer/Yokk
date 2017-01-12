const handle = require('./handlers')

module.exports = function (api) {
  api.route('/company(/:companyName)?')
    .post(handle.create)
    .get(handle.read)
    .put(handle.update)
    .delete(handle.delete)
}
