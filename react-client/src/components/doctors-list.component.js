import React, {Component} from "react";
import DoctorDataService from "../services/doctor.service";
import {Link} from "react-router-dom";

export default class DoctorsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveDoctors = this.retrieveDoctors.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveDoctor = this.setActiveDoctor.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            doctors: [],
            currentDoctor: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    componentDidMount() {
        this.retrieveDoctors();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    retrieveDoctors() {
        DoctorDataService.getAll()
            .then(response => {
                this.setState({
                    doctors: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveDoctors();
        this.setState({
            currentDoctor: null,
            currentIndex: -1
        });
    }

    setActiveDoctor(doctor, index) {
        this.setState({
            currentDoctor: doctor,
            currentIndex: index
        });
    }


    searchName() {
        this.setState({
            currentDoctor: null,
            currentIndex: -1
        });

        DoctorDataService.findByName(this.state.searchName)
            .then(response => {
                this.setState({
                    doctors: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {searchName, doctors, currentDoctor, currentIndex} = this.state;

        return (
            <>
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
                        <h4>Doctors List</h4>

                        <ul className="list-group">
                            {doctors &&
                            doctors.map((doctor, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveDoctor(doctor, index)}
                                    key={index}
                                >
                                    {doctor.name}
                                </li>
                            ))}
                        </ul>
                        <br/>
                        <div className="row">
                            <Link
                                to={"/doctors/add"}
                                className="badge badge-warning"
                            >
                                Add Doctor
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        {currentDoctor ? (
                            <div>
                                <h4>Doctor</h4>
                                <div>
                                    <label>
                                        <strong>Name:</strong>
                                    </label>{" "}
                                    {currentDoctor.name}
                                </div>
                                <div>
                                    <label>
                                        <strong>Phone Number:</strong>
                                    </label>{" "}
                                    {currentDoctor.phoneNumber}
                                </div>
                                <div>
                                    <label>
                                        <strong>Nationality:</strong>
                                    </label>{" "}
                                    {currentDoctor.nationality}
                                </div>
                                <div>
                                    <label>
                                        <strong>Specialization:</strong>
                                    </label>{" "}
                                    {currentDoctor.specialization}
                                </div>

                                <Link
                                    to={"/doctors/" + currentDoctor.id}
                                    className="badge badge-warning"
                                >
                                    Edit
                                </Link>
                                &nbsp;&nbsp;&nbsp;
                                <Link
                                    to={"/doctors/" + currentDoctor.id + "/patients"}
                                    className="badge badge-warning"
                                >
                                    View Patients
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <br/>
                                <br/>
                                <p>Please click on a Doctor to view his details...</p>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}
