import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from "./store/state";
import {BrowserRouter} from 'react-router-dom';
import {Provider as BusProvider} from "react-bus";
import './index.css';
import ScreensRoot from './screen/root';


const renderApp = preloadedState => {
    const store = configureStore(preloadedState);
    console.log(store);
    window.state = store.getState;


    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <BusProvider>
                    {/*<Header/>*/}
                    <ScreensRoot/>
                </BusProvider>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
};


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./components/App";
// import configureStore from "./store/store";
// import { Provider } from "react-redux";
// import { BrowserRouter } from 'react-router-dom';
// import { checkLoggedIn } from "./util/session";
//
// const renderApp = preloadedState => {
//     const store = configureStore(preloadedState);
//     window.state = store.getState;
//
//     ReactDOM.render(
//         <Provider store={store}>
//             <BrowserRouter>
//                 <App />
//             </BrowserRouter>
//         </Provider>,
//         document.getElementById("root")
//     );
// };
//
(async () => renderApp())();