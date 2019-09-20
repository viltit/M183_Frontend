import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'   // makes the calls to our api

// Add text to the cart: <!-- <p class="card-text"></p> -->
class Doctors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      doctors: null,
      isAdmin: true
    }
  }

  // make the api call when this component is mounted:
  async componentDidMount() {
    // TODO: Error handling ??
    const doctors = (await axios.get('http://localhost:8080/api/users')).data;
    
    // changing the state will trigger ``render()``
    this.setState({
      doctors: doctors
    })
  }

  // TODO: Add a link to edit each doctor
  render() {
    return(
      <div className="container">
        { /*  create new user 
              TODO: Only show this menu to admin */}
        { this.state.isAdmin &&  
        <Link to="/newUser">
              <div className="card text-white bg-secondary mb-3">
                <div className="card-body">
                  <h4 className="card-title">+ Add a new user</h4>
                </div>
              </div>
        </Link>
        }
        { this.state.doctors === null && <h5>Loading ...</h5>}
        { this.state.doctors && this.state.doctors.map((doctor, i) => (
          <div>
            <div key={doctor.id} className="card text-white bg-dark mb-3" key={i}>
              <Link to={`/doctor/patients/${doctor.id}`}>
              <div class="card-header">{doctor.role}</div>
              <div className="card-body">
                <h5 className="card-title">{doctor.firstName} {doctor.lastName}</h5>
                <p className="card-text">{doctor.email}</p>
              </div>
              </Link>
            </div>
            </div>
          ))
        }
        </div>
    )
  }
}

export default Doctors