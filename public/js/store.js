import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import promise from 'redux-promise-middleware'
import loadItems from './middlewares/loadItems'

const middleware = applyMiddleware(promise(), thunk, logger(), loadItems);
const store = createStore(reducer, middleware);
export default store;
