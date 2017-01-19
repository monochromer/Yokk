import store from '../store'
import axios from 'axios'
import request from 'superagent'

export default (store) => (next) => (action) => {
    const {callAPI, reqType, companyId, newName, ...rest} = action

    if(!callAPI) return next(action)

    switch (reqType) {
      case "post":
        request
            .post(callAPI)
            .send({ companyId: companyId })
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
            .send({newName: newName})
            .end((error, response) => {
              if (error) console.log(error)

              next({ ...rest, newName, response })
            })
        break

      default:
        axios.get(callAPI).then((response) => {
            const {data} = response
            next({...rest, data})
        })
    }
}
