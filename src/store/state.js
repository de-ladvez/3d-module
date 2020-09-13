// import { createStore, applyMiddleware  } from "redux";
// import thunk from "redux-thunk";
// import reducerApp from "../reduser/reduser";
// export default () => (
//     /* eslint-disable no-underscore-dangle */
//     createStore(
//         reducerApp,
//         applyMiddleware(thunk),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//     /* eslint-enable */
// );

import {createStore, compose, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import reducerApp from "../reduser/reduser";

// const setStore = store => next => action => {
//     return store.getState();
// };

// const logger = store => next => action => {
//     console.group(action.type);
//     console.info('dispatching', action);
//     let result = next(action);
//     console.log('next state', store.getState());
//     console.groupEnd();
//     return result
// };

/**
 * Lets you dispatch promises in addition to actions.
 * If the promise is resolved, its result will be dispatched as an action.
 * The promise is returned from `dispatch` so the caller may handle rejection.
 */
// const vanillaPromise = store => next => action => {
//     if (typeof action.then !== 'function') {
//         return next(action)
//     }
//
//     return Promise.resolve(action).then(store.dispatch)
// };

const configureStore = function () {
    return createStore(
        reducerApp,
        compose(
            applyMiddleware(
                thunkMiddleware,
                // setStore
                // vanillaPromise,
                // logger
            ),
            (window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__(): "undefined")
        )
    )
};

export default configureStore;

