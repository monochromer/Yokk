import store from '../store'
import axios from 'axios'

export default(store) => (next) => (action) => {
    const { updateItem } = action;
    
    if (!updateItem) return next(action);

    axios.put(updateItem.url, updateItem.data).then((response) => {
        action.payload = response.data;
        return next(action);
    });
}
