import axios from 'axios'

export default(store) => (next) => (action) => {
    const { updateItem, type } = action;
    
    if(!updateItem) return next(action);

    next({ type: type + '_START' });
    console.log(updateItem.data);
    axios.put(updateItem.url, updateItem.data).then((response) => {
        return next({ type: type + '_SUCCESS', payload: response.data});
    });
}
