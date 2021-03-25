import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPatient from "./components/add-patient.component";
import AddDoctor from "./components/add-doctor.component";
import Patient from "./components/patient.component";
import Doctor from "./components/doctor.component";
import PatientsList from "./components/patients-list.component";
import DoctorsList from "./components/doctors-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Clinic
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/doctors"} className="nav-link">
                Doctors
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/doctors"]} component={DoctorsList} />
            <Route exact path={"/doctors/:id/patients"} component={PatientsList} />
            <Route exact path="/doctors/:id/patients/add" component={AddPatient} />
            <Route exact path="/doctors/add" component={AddDoctor} />
            <Route path="/patients/:id" component={Patient} />
            <Route path="/doctors/:id" component={Doctor} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
