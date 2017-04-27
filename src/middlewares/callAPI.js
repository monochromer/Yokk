import axios from 'axios'

export default (store) => (next) => (action) => {
  const {callAPI, reqType, companyId, newName, body, ...rest} = action

  if(!callAPI) return next(action)

  switch (reqType) {
    case "post":
      axios.post(callAPI, body).then((response) => {
        next({ ...rest, response })
      }, (err) => {
        console.log(err)
      })
      break

    case "delete":
      axios.delete(callAPI).then((response) => {
        next({ ...rest, response })
      }, (err) => {
        console.log(err)
      })
      break

    case "put":
      axios.put(callAPI, body).then((response) => {
        const dontChange = true
        if (response.data.nameExist) return next({ ...rest, dontChange })
        next({ ...rest, response })
      }, (err) => {
        console.log(err)
      })
      break

    default:
      axios.get(callAPI).then((response) => {
          const {data} = response
          next({...rest, data})
      })
  }
}
