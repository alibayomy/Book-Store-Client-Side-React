import { createStore, applyMiddleware } from "redux";
import CheckPrice from './Reducers/CheckPriceReducer';
import { composeWithDevTools } from "redux-devtools-extension";

const myStore = createStore(CheckPrice, composeWithDevTools())

export default myStore