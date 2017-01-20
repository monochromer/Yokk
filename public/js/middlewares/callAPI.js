import store from '../store'
import axios from 'axios'
import request from 'superagent'

export default (store) => (next) => (action) => {
    const {callAPI, reqType, companyId, newName, body, ...rest} = action

    if(!callAPI) return next(action)

    switch (reqType) {
      case "post":
        request
            .post(callAPI)
            .send(body)
            .end((error, response) => {
              if (error) console.log(error)

              next({ ...rest, response })
            })
        break

      case "delete":
        request
            .del(callAPI)
            .end((error, response) => {
              if (error) console.log(error)

              next({ ...rest, response })
            })
        break

      case "put":
        request
            .put(callAPI)
            .send(body)
            .end((error, response) => {
              if (error) console.log(error)
              const dontChange = true
              if (response.body.nameExist) return next({... rest, dontChange})
              next({ ...rest, response })
            })
        break

      default:
        axios.get(callAPI).then((response) => {
            const {data} = response
            next({...rest, data})
        })
    }
}
