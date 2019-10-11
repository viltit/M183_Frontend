import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios'  

/**
 * Private Route for all Sites that need a User to be logged in
 * We make an API request each time (this may not be the best solution). If apy throws an .unothroized, we redirect the User
 * to the main page
 */

async function isAuthorized() {
    await axios.get('http://localhost:8080/loginStatus/', { withCredentials: true })
    .then(response => {
        console.log(response)
        return true
    })
    .catch( error => {
        console.log(error)
        return false
    })
}


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ props => (
        isAuthorized() === true 
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
) 

export default PrivateRoute