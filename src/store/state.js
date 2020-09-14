import {createStore, compose, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import reducerApp from "../reduser/reduser";

const configureStore = function () {
    return createStore(
        reducerApp,
        compose(
            applyMiddleware(
                thunkMiddleware,
            ),
            // (window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__(): "undefined")
        )
    )
};

export default configureStore;

