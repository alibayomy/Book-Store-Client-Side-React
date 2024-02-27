import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from 'react-redux';
import myStore from './Store/Store';

ReactDOM.render(
    <Provider store={myStore}>
        <App />
    </Provider>
    , document.getElementById("root"));
