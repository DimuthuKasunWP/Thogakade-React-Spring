import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import NavbarReducer from './store/reducers/NavbarReducer';
import UploadeReducer from './store/reducers/UploadReducer';
import LoaderReducer from './store/reducers/LoaderReducer';

const rootReducer=combineReducers({
    navbarRed:NavbarReducer,
    uploadRed:UploadeReducer,
    loaderRed:LoaderReducer
});

// make the compose enhacers for redux devtools

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// make the store for store the reducer and functions which returns from action creators

const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));