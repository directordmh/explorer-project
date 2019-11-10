import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import homeReducer from './home-reducer'
import informationReducer from "./information-reducer";

let reducers = combineReducers({
    homePage: homeReducer,
    informationPage: informationReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.__store__ = store

export default store