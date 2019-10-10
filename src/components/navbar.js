import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

// Navigation bar with login form
// TODO: When user is already logged in, show logout-button
function Navbar() {

    // I do not get these. Google "useState hook" if you have the time
    // For now it it sufficient to understand that we can store the current value of variables we need to track here:
    const [email, setEmail] = useState("")
    const [password, setPassword]  = useState("")

    function handleSubmit(event) {
        event.preventDefault()
        axios.post('http://localhost:8080/login/', {
            email: email,
            password: password
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log("Error: ", error)
          
        })
    }

    return (
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
        <form className="form-inline" onSubmit={ handleSubmit }>
            <input className="form-control mr-sm-2" type="email" placeholder="email" 
                aria-label="email" onChange={ e => setEmail(e.target.value) } />
            <input className="form-control mr-sm-2" type="password" placeholder="password" 
                aria-label="password" onChange={ e => setPassword(e.target.value) }/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Log in</button>
        </form>
        </nav>
    );
}

export default Navbar