import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// !!!! TODO: STORING ACCESS TOKENS IN LOCAL STORAGE IS A SECURITY RISK. It can be read by ANY javascript code !!!
// Better to use a cookie that only the server can read 
// HOWEVER, this school project does not get credits for security, and for the sake of "getting it done", we use the local storage here
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)