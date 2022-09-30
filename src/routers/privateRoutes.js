import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from './utils';

const PrivateRoute = ({ component: Component, restricted, ...rest }) => {
    // const isLog = isLogin()
    // debugger
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Redirect to="/" />
                : <Component {...props} />

        )} />
    );
};

export default PrivateRoute;