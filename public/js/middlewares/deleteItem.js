import axios from 'axios'

export default(store) => (next) => (action) => {
    const {deleteItem, type} = action;

    if (!deleteItem)
        return next(action);

    axios.delete(deleteItem.url).then((response) => {
        action.payload = response.data;
        return next(action)
    });
}
