import React from 'react'

// Add text to the cart: <!-- <p class="card-text"></p> -->

const Doctors = ({ doctors }) => {
    return (
        <div>
          <center><h1>Contact List</h1></center>
          {doctors.map((doctor, i) => (
            <div className="card" key={i}>
              <div className="card-body">
                <h5 className="card-title">{doctor.firstName} {doctor.lastName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{doctor.email}</h6>
              </div>
            </div>
          ))}
        </div>
      )
};

export default Doctors