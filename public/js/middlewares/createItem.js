import request from 'superagent'

export default (store) => (next) => (action) => {
    var { createItem } = action;

    if(!createItem) return next(action);

    request.post(createItem.url).send(createItem.data).end( (err, response) => {
        action.payload = response.body;
        next(action);
    });
}
