import React, { Component } from 'react'


class Welcome extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="container">
                <h1>Patient Administration</h1>
                <h3>A demo project for the Gewerblich-Industrielle-Berufsschule in Muttenz</h3>
                <br/>
                <div className="alert alert-info" role="alert">
                    You need to log in with your username and password to see any subsites.
                </div>
            </div>
        )
    }
}

export default Welcome