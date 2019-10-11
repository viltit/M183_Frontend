import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class DoctorPatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patients: null
        }
    }

    // see doctor.js for more details about how react handles these functions
    // TODO: Error handling
    async componentDidMount() {
        const { match: { params } } = this.props
        const patients = (await axios.get(`http://localhost:8080/api/users/patients/${params.doctorID}`
            ,{ withCredentials: true }))
            .data
        this.setState(
            { patients: patients }
        )
    }

    render() {
        return (
            <div className='container'>
            { this.state.patients === null && <h5>Loading ...</h5>}
            { this.state.patients && this.state.patients.map((patient, i) => (
            <div key={patient.id} className="card text-white bg-dark mb-3" key={i}>
              <Link to={`/patients/${patient.id}`}>
              <div className="card-header">Patient</div>
              <div className="card-body">
                <h5 className="card-title">{patient.firstName} {patient.lastName}</h5>
                <p className="card-text">{patient.email}</p>
              </div>
              </Link>
            </div>
          ))
        }
            </div>
        )
    }
}

export default DoctorPatient