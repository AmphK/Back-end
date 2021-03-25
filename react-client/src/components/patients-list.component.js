import React, {Component} from "react";
import PatientDataService from "../services/patient.service";
import {Link} from "react-router-dom";

export default class PatientsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrievePatients = this.retrievePatients.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActivePatient = this.setActivePatient.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            patients: [],
            currentPatient: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    componentDidMount() {
        this.retrievePatients();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    retrievePatients() {
        PatientDataService.getAll(this.props.match.params.id)
            .then(response => {
                this.setState({
                    patients: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrievePatients();
        this.setState({
            currentPatient: null,
            currentIndex: -1
        });
    }

    setActivePatient(patient, index) {
        this.setState({
            currentPatient: patient,
            currentIndex: index
        });
    }


    searchName() {
        this.setState({
            currentPatient: null,
            currentIndex: -1
        });

        PatientDataService.findByName(this.state.searchName, this.props.match.params.id)
            .then(response => {
                this.setState({
                    patients: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {searchName, patients, currentPatient, currentIndex} = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                            value={searchName}
                            onChange={this.onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Patients List</h4>

                    <ul className="list-group">
                        {patients &&
                        patients.map((patient, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActivePatient(patient, index)}
                                key={index}
                            >
                                {patient.name}
                            </li>
                        ))}
                    </ul>
                <br>
                </br>
                <div className="row">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link
                        to={"/doctors/" + this.props.match.params.id + "/patients/add"}
                        className="badge badge-warning"
                    >
                        Add Patient
                    </Link>
                </div>
            </div>
            < div
        className = "col-md-6" >
            {
                currentPatient ? (
                    <div>
                        <h4>Patient</h4>
                        <div>
                            <label>
                                <strong>Name:</strong>
                            </label>{" "}
                            {currentPatient.name}
                        </div>
                        <div>
                            <label>
                                <strong>Age:</strong>
                            </label>{" "}
                            {currentPatient.age}
                        </div>
                        <div>
                            <label>
                                <strong>Total Money Spent:</strong>
                            </label>{" "}
                            {currentPatient.totalMoneySpent}
                        </div>
                        <div>
                            <label>
                                <strong>Registration Date:</strong>
                            </label>{" "}
                            {currentPatient.registrationDate}
                        </div>

                        <Link
                            to={"/patients/" + currentPatient.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <br/>
                        <p>Please click on a Patient to view his details...</p>
                    </div>
                )
            }
    </div>
    </div>
    );
    }
    }
