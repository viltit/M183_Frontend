import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

// TODO IMPORTANT: Error or success message
// TODO IMPORTANT: Authentification and Roles
class AddDoctor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            disabled: false,
            firstName: "",
            lastName: "",
            email: "",
            role: "",
            password: "",
            error: null
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
    setPassword(pw) {
      this.setState(
        { password: pw }
      )
    }

    async submit() {
        this.setState(
            { disabled: true }
        )
        await axios.post('https://localhost:8090/api/users/create', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            role: this.state.role,
            password: this.state.password
        }, { withCredentials: true })
        .then( result => {
            this.props.history.push('/doctors/')
        })
        .catch(error => {
          this.setState( { error: error.response.data.reason } )
        })
    }

    render() {
        return (
        <div className="container">
        { this.state.error !== null && 
          <div className="alert alert-danger" role="alert">
                { this.state.error }
            </div>
        }
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New User</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">First name:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.setFirstName(e.target.value)}}
                    className="form-control"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Last name:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.setLastName(e.target.value)}}
                    className="form-control"
                    placeholder="Enter last name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email:</label>
                  <input
                    disabled={this.state.disabled}
                    type="email"
                    onBlur={(e) => {this.setEmail(e.target.value)}}
                    className="form-control"
                    placeholder="Valid email address"
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
                    placeholder="Role (ie. doctor, nurse, admin)"
                  />
                </div>
                { /* password */}
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Password</label>
                  <input
                    disabled={this.state.disabled}
                    type="password"
                    onBlur={(e) => {this.setPassword(e.target.value)}}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                { /* TODO: Confirm password */}
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
    )}
}

export default AddDoctor