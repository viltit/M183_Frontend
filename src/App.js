import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import Doctors from './components/doctors';
import DoctorPatient from './components/doctorDetail'
import AddUser from './components/addDoctor'
import EditUser from './components/editDoctor'
import Navbar from './components/navbar';

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
        <Route exact path = '/doctors' component = { Doctors } />
        <Route exact path = '/doctor/patients/:doctorID' component = { DoctorPatient } />
        <Route exact path = '/newUser' component = { AddUser } />
        <Route exact path = '/user/edit/:userID' component = { EditUser } />
      </div>
    );
  }
}

export default App;