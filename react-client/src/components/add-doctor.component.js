import React, {Component} from "react";
import DoctorDataService from "../services/doctor.service";

export default class AddDoctor extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeNationality = this.onChangeNationality.bind(this);
        this.onChangeSpecialization = this.onChangeSpecialization.bind(this);
        this.saveDoctor = this.saveDoctor.bind(this);
        this.newDoctor = this.newDoctor.bind(this);

        this.state = {
            name: "",
            phoneNumber: "",
            nationality: "",
            specialization: "",

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        });
    }


    onChangeNationality(e) {
        this.setState({
            nationality: e.target.value
        });
    }

    onChangeSpecialization(e) {
        this.setState({
            specialization: e.target.value
        });
    }


    saveDoctor() {
        var data = {
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            nationality: this.state.nationality,
            specialization: this.state.specialization,
        };

        DoctorDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    phoneNumber: this.state.phoneNumber,
                    nationality: this.state.nationality,
                    specialization: this.state.specialization,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newDoctor() {
        this.setState({
            name: "",
            phoneNumber: "",
            nationality: "",
            specialization: "",
            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newDoctor}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="age">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="age"
                                required
                                value={this.state.phoneNumber}
                                onChange={this.onChangePhoneNumber}
                                name="age"
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="age">Nationality</label>
                            <input
                                type="text"
                                className="form-control"
                                id="age"
                                required
                                value={this.state.nationality}
                                onChange={this.onChangeNationality}
                                name="age"
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="age">Specialization</label>
                            <input
                                type="text"
                                className="form-control"
                                id="age"
                                required
                                value={this.state.specialization}
                                onChange={this.onChangeSpecialization}
                                name="age"
                            />
                        </div>

                        <button onClick={this.saveDoctor} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
