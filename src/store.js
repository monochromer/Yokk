import { applyMiddleware, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import promise from 'redux-promise-middleware'
import loadItems from './middlewares/loadItems'
import updateItem from './middlewares/updateItem'
import deleteItem from './middlewares/deleteItem'
import createItem from './middlewares/createItem'

const middleware = applyMiddleware(promise(), thunk, loadItems, updateItem, deleteItem, createItem, createLogger());
const store = createStore(
    reducer,
    compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

window.store = store;

export default store;
