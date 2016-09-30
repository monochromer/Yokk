import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import promise from 'redux-promise-middleware'
import loadItems from './middlewares/loadItems'
import updateItem from './middlewares/updateItem'

const middleware = applyMiddleware(promise(), thunk, logger(), loadItems, updateItem);
const store = createStore(reducer, middleware);
export default store;
