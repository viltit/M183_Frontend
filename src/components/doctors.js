import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'   // makes the calls to our api

// Add text to the cart: <!-- <p class="card-text"></p> -->
class Doctors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      doctors: null,
      isAdmin: true,
      error: null
    }
  }

  // make the api call when this component is mounted:
  async componentDidMount() {
    axios.get('http://localhost:8080/api/users')
      .then(response => {
        this.setState({ doctors: response.data })
      })
      .catch(error => {
        switch (error.response.status) {
          case 401: this.setState({ error: "User is not authenticated" })
          case 404: this.setState({ error: "Invalid route"})
        }
      })
  }

  // TODO: Add a link to edit each doctor
  render() {
    return(
      <div className="container">
        { /*  create new user 
              TODO: Only show this menu to admin */}
        { this.state.error && 
          <div class="alert alert-danger" role="alert">
            Error while connecting to the server: { this.state.error }
          </div>
        }
        { this.state.isAdmin && this.state.error == null && 
        <Link to="/newUser">
              <div className="card text-white bg-secondary mb-3">
                <div className="card-body">
                  <h4 className="card-title">+ Add a new user</h4>
                </div>
              </div>
        </Link>
        }
        { this.state.doctors === null && this.state.error == null && <h5>Loading ...</h5>}
          <table className="table table-dark">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
        { this.state.doctors && this.state.doctors.map((doctor, i) => (
                <tr>
                  <td>{ doctor.firstName }</td> 
                  <td>{ doctor.lastName }</td>
                  <td>{ doctor.email }</td>
                  <td>{ doctor.role }</td>
                  <td><Link to={`/doctor/patients/${doctor.id}`}>Patients</Link></td>
                  <td><Link to={ {
                    /* TODO: Could we directl write in the Linked Components state ? */
                    pathname: `/user/edit/${doctor.id}`,
                    state: { 
                      firstName: doctor.firstName ,
                      lastName: doctor.lastName,
                      email: doctor.email,
                      role: doctor.role 
                    }
                  } }>Edit</Link></td>
                </tr>
          ))
        }
        </table>
        </div>
        
    )
  }
}

export default Doctors