import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class DoctorPatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patients: null,
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
        const { match: { params } } = this.props
        return (
            <div className='container'>
            { this.state.patients === null && <h5>Loading ...</h5>}
          
            <Link to={ `/patient/new/${ params.doctorID }` }>
                <div className="card text-white bg-secondary mb-3">
                    <div className="card-body">
                    <h4 className="card-title">+ Add a new patient</h4>
                    </div>
                </div>
            </Link>
            <table className="table table-dark">
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.patients && this.state.patients.map((patient, i) =>  (
                        <tr key={ i }>
                        <td>{ patient.firstName }</td> 
                        <td>{ patient.lastName }</td>
                        <td>{ patient.email }</td>
                        <td>
                            <Link to={ {
                                /* TODO: Could we directl write in the Linked Components state ? */
                                pathname: `/patient/edit/${ this.state.docID }`,
                                state: { 
                                    firstName: patient.firstName ,
                                    lastName: patient.lastName,
                                    email: patient.email,
                                }
                            } }>Edit</Link>
                        </td>
                        </tr>
                        )) 
                    }
                </tbody>
                </table>       
        </div>
    )}
}

export default DoctorPatient