import React, {Component} from 'react';
import styles from "./index.module.css";
import axios from "axios";
import {Redirect} from "react-router-dom";


class AddTripSidebar extends Component {

    constructor() {
        super();
        this.state = {
            tripName: "",
            tripSummary: "",
            tripStartDate: "",
            tripEndDate: "",
            privacy: "",
            redirect:false
        };
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        const tripRequest = {
            name: this.state.tripName,
            summary: this.state.tripSummary,
            startDate: this.state.tripStartDate,
            endDate: this.state.tripEndDate,
            privacyLevel: this.state.privacy,
        };
        await axios
            .post(
                "https://trip-planner-mm.herokuapp.com/trips",
                tripRequest
            )
            .then(() => {
                this.setState({redirect:true});
            })
            .catch((errors) => {
                console.log(errors);
            });
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const redirect = this.state.redirect;
        if (redirect) {
            return <Redirect to="/" />
        }
        return (

            <div>
                <div>
                    <form onSubmit={this.handleSubmit} className={styles.form}>
                        <h3 className="text-xl mb-4">Add Trip</h3>
                        <div className={styles.row}>
                            <label htmlFor="tripName">Trip Name</label>
                            <input
                                name="tripName"
                                className={styles.input}
                                placeholder="Trip Name"
                                type="text"
                                value={this.state.tripName}
                                onChange={this.handleChange}

                            />
                        </div>
                        <div className={styles.row}>
                            <label htmlFor="tripSummary">Trip Summary</label>
                            <textarea
                                className={styles.input}
                                name="tripSummary"
                                placeholder="e.g. awesome trip"
                                rows="5"
                                value={this.state.tripSummary}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.row}>
                            <label htmlFor="tripStartDate">Start Date</label>
                            <input
                                name="tripStartDate"
                                type="datetime-local"
                                placeholder="15/01/2021"
                                className={styles.input}
                                value={this.state.tripStartDate}
                                onChange={this.handleChange}


                            />
                        </div>
                        <div className={styles.row}>
                            <label htmlFor="tripEndDate">End Date</label>
                            <input
                                name="tripEndDate"
                                value={this.state.tripEndDate}
                                type="datetime-local"
                                placeholder="15/01/2021"
                                className={styles.input}
                                onChange={this.handleChange}

                            />
                        </div>
                        <div className={styles.row}>
                            <div className="flex items-center">
                                <input type="radio" name="privacy" onChange={this.handleChange} value="ONLY_ME"
                                       className="form-radio mx-2"/> <span>Only me</span>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" name="privacy" onChange={this.handleChange} value="FRIENDS"
                                       className="form-radio mx-2"/> <span>My followers</span>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" name="privacy" onChange={this.handleChange} value="EVERYONE"
                                       className="form-radio mx-2"/> <span>Public</span>
                            </div>

                        </div>

                        <div className="self-center">
                            <input type="submit" className={styles.saveButton} value="Create Trip"/>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}


export default AddTripSidebar;