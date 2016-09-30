import store from '../store'
import axios from 'axios'

export default (store) => (next) => (action) => {
    if(!action.loadItems) return next(action);

    axios.get(action.loadItems).then((response) => {
        action.payload = response.data;
        return next(action);
    });
}
