import request from 'superagent'

export default (store) => (next) => (action) => {
  const { createItem } = action

  if (!createItem) return next(action)

  request.post(createItem.url)
    .send(createItem.data)
    .end((err, response) => {
      if (err) {
        action.error = response.text
        action.type += '_FAIL'
        return next(action)
      }

      action.payload = response.body
      return next(action)
    })
}
