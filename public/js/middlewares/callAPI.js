import store from '../store'
import axios from 'axios'

export default (store) => (next) => (action) => {
    const {callAPI, ...rest} = action

    if(!callAPI) return next(action)

    axios.get(callAPI).then((response) => {
        const {data} = response
        next({...rest, data})
    })
}
