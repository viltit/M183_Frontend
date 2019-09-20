import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
// TODO: Authentification and Roles
import axios from 'axios';

class AddDoctor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            disabled: false,
            firstName: "",
            lastName: "",
            email: "",
            role: ""
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
        await axios.post('http://localhost:8080/api/users/create', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            role: this.state.role
        })

        // ???
        this.props.history.push('/')
    }

    render() {
        return (
        <div className="container">
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
                    type="text"
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