import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './components/authenticate' 

/**
 * Private Route for all Sites that need a User to be logged in
 * We make an API request each time (this may not be the best solution). If apy throws an .unothroized, we redirect the User
 * to the main page
 */


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ props => (
        auth.isAuthenticated 
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
) 

export default PrivateRoute