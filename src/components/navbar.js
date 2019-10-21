import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import auth from './authenticate'

// Navigation bar with login form
// TODO: When user is already logged in, show logout-button
function Navbar() {

    // I do not get these. Google "useState hook" if you have the time
    // For now it it sufficient to understand that we can store the current value of variables we need to track here:
    const [email, setEmail] = useState("")
    const [password, setPassword]  = useState("")
    const [isLoggedIn, setLogin] = useState("")
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    function handleLoginSubmit(event) {
        event.preventDefault()
 
        axios.post('http://localhost:8080/login/', {
            email: email,
            password: password },
            { withCredentials: true 
        })
        .then(response => {
          setLogin(true)
          setError(null)
          let user = response.data
          setUser(user)
          console.log(user)
          auth.authenticate()
        })
        .catch(error => {
          setError(error)
        })
    }

    function handleLogoutSubmit(event) {
        event.preventDefault()

        /*
            I SPENT 4 HOURS FIGURING OUT WHY THE API CAN NOT LOG OUT until I realized we need withCredentials: true !!!
        */
        axios.get('http://localhost:8080/logout/', { withCredentials: true })
        .then(response => {
            setLogin(false)
            setUser(null)
            setError(null)
            auth.authenticate()
        })
        .catch( e => {
            // error or not, we log out
            setLogin(false)
            setError(null)
            auth.authenticate()
        })
    }

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Welcome
                    </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/doctors">
                    User overview
                </Link>
                </li>
            </ul>
            </div>
            { /* Check if user logged out and redirect if so. It seems this works (ie., no inifinite redirect) */ }
            { isLoggedIn == false && <Redirect to="/" /> }
            { /* Check if user is logged in and show login form / logout button */ }
            { isLoggedIn ?   
                <div>
                { /* TODO: Space between username and logout button  */}
                { user && 
                    <Link to="/setAvatar/1"><img src= { require("./../images/default-avatar.jpg") } width="30px" height="30px" />  Logged in as { user.firstName } { user.lastName } </Link>
                }
                <button className="btn btn-outline-success my-2 my-sm-0" 
                    type="submit" onClick={ e => handleLogoutSubmit(e) }>Log out</button>
                </div>
                :
                <form className="form-inline" onSubmit={ handleLoginSubmit }>
                    <input className="form-control mr-sm-2" type="email" placeholder="email" 
                        aria-label="email" onChange={ e => setEmail(e.target.value) } />
                    <input className="form-control mr-sm-2" type="password" placeholder="password" 
                        aria-label="password" onChange={ e => setPassword(e.target.value) }/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Log in</button>
                </form>
            }
            </nav>
            { /* invalid login */ }
            { error !== null && 
                <div className="alert alert-danger" role="alert">
                    Invalid username or password.
                </div>
            }
        </div>
    );
}

export default Navbar