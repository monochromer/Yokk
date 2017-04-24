import axios from 'axios';

export default (store) => (next) => (action) => {
  var { createItem } = action;

  if(!createItem) return next(action);

  axios.post(createItem.url, createItem.data)
    .then( (response) => {
      action.payload = response.data;
      return next(action);
    }, (err) => {
      action.error = err.response.data;
      action.type += '_FAIL';
      return next(action);
    });
}
