import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, restricted, ...rest }) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
           sessionStorage.getItem('authToken') ?
            <Component {...props} /> :
                <Redirect to="/wallet-connect" />

        )} />
    );
};

export default PrivateRoute;