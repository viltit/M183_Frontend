import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import Welcome from './components/welcome'
import Doctors from './components/doctors'
import DoctorPatient from './components/doctorDetail'
import AddUser from './components/addDoctor'
import EditUser from './components/editDoctor'
import AddPatient from './components/addPatient'
import Navbar from './components/navbar'
import PrivateRoute from './PrivateRoute'

class App extends Component {

  state = {
    doctors: [],
    error: String
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/users')
      .then(result => result.json())
      .then((data) => {
        this.setState({ doctors: data })  
      })
      .catch((error) => {
          console.log(error) 
          this.setState({ error: error } ) 
        }
      )
  }

  render () { 
    // TODO: Secured path
    return (
      <div>
        <Navbar/>
        <Route exact path = '/' component = { Welcome }></Route>
        <PrivateRoute exact path = '/doctors' component = { Doctors } />
        <PrivateRoute exact path = '/doctor/patients/:doctorID' component = { DoctorPatient } />
        <PrivateRoute exact path = '/newUser' component = { AddUser } />
        <PrivateRoute exact path = '/user/edit/:userID' component = { EditUser } />
        <PrivateRoute exact path = '/patient/new/:userID' component = { AddPatient } />
      </div>
    );
  }
}

export default App;