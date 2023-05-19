import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from './utils';

const PrivateRoute = ({ component: Component, restricted, ...rest }) => {
    const isLog = window.ethereum?.selectedAddress
    // 
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLog() ?
            <Component {...props} /> :
                <Redirect to="/wallet-connect" />

        )} />
    );
};

export default PrivateRoute;