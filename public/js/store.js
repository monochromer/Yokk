import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import promise from 'redux-promise-middleware'
import loadItems from './middlewares/loadItems'
import updateItem from './middlewares/updateItem'
import deleteItem from './middlewares/deleteItem'
import createItem from './middlewares/createItem'

const middleware = applyMiddleware(promise(), thunk, loadItems, updateItem, deleteItem, createItem, logger());
const store = createStore(reducer, middleware);

export default store;
