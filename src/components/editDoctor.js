import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
// TODO: Authentification and Roles
import axios from 'axios';

class EditDocor extends Component {

    // TODO: Include doctors data in constructor ?
    // TODO: Repeating code (see addDoctor.js)
    // TODO IMPORTANT: Error or success message
    constructor(props) {
        super(props)

        // the props.location.state are set in the <Link> in dotors.js
        this.state = {
            disabled: false,
            firstName: this.props.location.state.firstName,
            lastName: this.props.location.state.lastName,
            email: this.props.location.state.email,
            role: this.props.location.state.role
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
            role: this.state.role
        })

        // ???
        this.props.history.push('/')
    }

    render() {
        let firstName = this.state.firstName 
        return (
        <div className="container">
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
                    type="text"
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
        </div>
    )
    }
}

export default EditDocor