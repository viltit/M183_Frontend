import React from 'react'
import {Link} from 'react-router-dom'

// we are using bootstraps navbar here
function Navbar() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <Link className="nav-link" to="/">
                    Welcome
                </Link>
            </li>
            <li class="nav-item">
            <Link className="nav-link" to="/doctors">
                User overview
            </Link>
            </li>
        </ul>
        </div>
        </nav>
    );
}

export default Navbar