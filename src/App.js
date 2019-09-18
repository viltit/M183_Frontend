import React, {Component} from 'react';
import Doctors from './components/doctors';

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
    return (
      <Doctors doctors={this.state.doctors}/>
    );
  }
}

export default App;