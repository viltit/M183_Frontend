import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
// TODO: Authentification and Roles
import axios from 'axios';
import {Link} from 'react-router-dom'

class EditDocor extends Component {

    // TODO: Include doctors data in constructor ?
    // TODO: Repeating code (see addDoctor.js)
    constructor(props) {
        super(props)

        // the props.location.state are set in the <Link> in dotors.js
        this.state = {
            disabled: false,
            firstName: this.props.location.state.firstName,
            lastName: this.props.location.state.lastName,
            email: this.props.location.state.email,
            role: this.props.location.state.role,
            success: null,
            error: null,
        }
    }

    setFirstName(name) {
        this.setState(
            { firstName: name }
        )
    }
    setLastName(name) {
        this.setState(
            { lastName: name }
        )
    }
    setEmail(email) {
        this.setState(
            { email: email }
        )
    } 
    setRole(role) {
        this.setState(
            { role: role }
        )
    }

    async submit() {
        this.setState(
            { disabled: true }
        )
        const { match: { params } } = this.props
        await axios.put(`http://localhost:8080/api/users/${params.userID}`, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                role: this.state.role,
            }, { withCredentials: true })
        
        .then( response => {
            this.setState({ 
                success: "User details saved succesful"
            })
        })
        .catch( error => {
            this.setState( { error: error.response.data.reason } )
        })

        // ???
        // this.props.history.push('/')
    }

    render() {
        let firstName = this.state.firstName 
        return (
        <div className="container">
        { /* Error handling */ }
        { this.state.error != null && 
            <div className="alert alert-danger" role="alert">
                { this.state.error }
            </div>
        }
        { this.state.success == null &&
            <div className="row">
                <div className="col-12">
                <div className="card border-primary">
                    <div className="card-header">Edit User</div>
                    <div className="card-body text-left">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">First name:</label>
                        <input
                        disabled={this.state.disabled}
                        type="text"
                        onBlur={(e) => {this.setFirstName(e.target.value)}}
                        className="form-control"
                        defaultValue={ firstName }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Last name:</label>
                        <input
                        disabled={this.state.disabled}
                        type="text"
                        onBlur={(e) => {this.setLastName(e.target.value)}}
                        className="form-control"
                        defaultValue={ this.state.lastName }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email:</label>
                        <input
                        disabled={this.state.disabled}
                        type="email"
                        onBlur={(e) => {this.setEmail(e.target.value)}}
                        className="form-control"
                        defaultValue={ this.state.email }
                        />
                    </div>
                    { /* TODO: Choose role from dropdown list */}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Role</label>
                        <input
                        disabled={this.state.disabled}
                        type="text"
                        onBlur={(e) => {this.setRole(e.target.value)}}
                        className="form-control"
                        defaultValue={ this.state.role }
                        />
                    </div>
                    { /* We do NOT allow password changes here */ }
                    <button
                        disabled={this.state.disabled}
                            className="btn btn-primary"
                            onClick={() => {this.submit()}}>
                            Submit
                    </button>
                    </div>
                </div>
                </div>
            </div>
        }
        { this.state.success !== null &&
            <div class="alert alert-success" role="alert">
                { this.state.success }
                <br />
                <Link to={ { pathname: `/doctors` } } style={ {color: 'blue'} }>Back to User overwiev</Link>
            </div>
        }
        </div>
    )
    }
}

export default EditDocor