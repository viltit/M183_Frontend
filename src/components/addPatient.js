import React, {Component} from 'react';
import axios from 'axios';

class AddPatient extends Component {

    constructor(props) {
        super(props)

        this.state = {
            disabled: false,
            firstName: "",
            lastName: "",
            email: "",
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

    async submit() {
        this.setState(
            { disabled: true }
        )

        const { match: { params } } = this.props    /// ???? I just understand I need this line to access the docID in the URL
        await axios.post(`http://localhost:8080/api/patient/${ params.userID }`, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
        }, { withCredentials: true })
        .then( result => {
           this.props.history.push(`/doctor/patients/${ params.userID }`)
        })
        .catch(error => {
            console.log(error)
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

export default AddPatient