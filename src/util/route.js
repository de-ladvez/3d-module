import React from "react";
import {Redirect, Route, withRouter} from "react-router-dom";

export const RouteWrapper = ({
                                 component: Component,
                                 layout: Layout,
                                 redirect = "/",
                                 isData="",
                                 ...rest
                             }) => (
    <Route {...rest} render={(props) => (
        isData ?
            <Layout {...props}>
                <Component {...props} />
            </Layout>:
            <Redirect to={redirect}/>
    )}
    />
);