import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

const initialState = {}
const middleware = applyMiddleware(thunk)
const composedEnhancers = compose(middleware)
const store = createStore(rootReducer, initialState, composedEnhancers)

export default store
