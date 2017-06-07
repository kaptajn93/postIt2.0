import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux"
import { createLogger } from 'redux-logger'
import thunk from "redux-thunk"
// import promise from "redux-promise-middleware"
import reducer from './reducers'
import Layout from "./components/PostItPage";

 const middleware = applyMiddleware(thunk, createLogger())

let store = createStore(reducer, middleware)

const app = document.getElementById('app');
ReactDOM.render(<Provider store={store}>
    <Layout/>
    </Provider>, app);
