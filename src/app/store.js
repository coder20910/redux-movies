import {createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../rootReducer"
// 3
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;