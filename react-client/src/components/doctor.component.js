import React, {Component} from "react";
import DoctorDataService from "../services/doctor.service";

export default class Doctor extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.getDoctor = this.getDoctor.bind(this);
        this.updateDoctor = this.updateDoctor.bind(this);
        this.deleteDoctor = this.deleteDoctor.bind(this);

        this.state = {
            currentDoctor: {
                id: null,
                name: "",
                phoneNumber: "",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getDoctor(this.props.match.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentDoctor: {
                    ...prevState.currentDoctor,
                    name: name
                }
            };
        });
    }

    onChangePhoneNumber(e) {
        const phoneNumber = e.target.value;

        this.setState(prevState => ({
            currentDoctor: {
                ...prevState.currentDoctor,
                phoneNumber: phoneNumber
            }
        }));
    }

    getDoctor(id) {
        DoctorDataService.get(id)
            .then(response => {
                this.setState({
                    currentDoctor: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateDoctor() {
        DoctorDataService.update(
            this.props.match.params.id,
            this.state.currentDoctor
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The doctor was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteDoctor() {
        DoctorDataService.delete(this.state.currentDoctor.id)
            .then(response => {
                this.props.history.push('/doctors')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {currentDoctor} = this.state;

        return (
            <div>
                {currentDoctor ? (
                    <div className="edit-form">
                        <h4>Doctor</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentDoctor.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="age"
                                    value={currentDoctor.phoneNumber}
                                    onChange={this.onChangePhoneNumber}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="nationality">Nationality</label>
                                <input
                                    disabled
                                    type="text"
                                    className="form-control"
                                    id="nationality"
                                    value={currentDoctor.nationality}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="specialization">Specialization</label>
                                <input
                                    disabled
                                    type="text"
                                    className="form-control"
                                    id="specialization"
                                    value={currentDoctor.specialization}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteDoctor}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateDoctor}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Doctor...</p>
                    </div>
                )}
            </div>
        );
    }
}
