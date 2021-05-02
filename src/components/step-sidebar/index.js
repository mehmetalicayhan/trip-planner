import React, {Component} from 'react';
import styles from "./index.module.css";
import formStyles from "../addtrip-sidebar/index.module.css";
import BuildingSVG from "./buildings.svg";
import Flag from "./bayrak.png";
import axios from "axios";

class StepSidebar extends Component {

    state = {
        steps: [
            {a: 1, b: 2},
            {a: 1, b: 2},
            {a: 1, b: 2},
            {a: 1, b: 2},
            {a: 1, b: 2},
            {a: 1, b: 2},
        ],
        selectedItem: 0,
        isFormActive: false,
        stepName: "",
        stepOrder: 0,
        stepSummary: "",
        stepStartDate: ""

    }
    /*getAllTrips = async () => {
        await axios.get("https://trip-planner-mm.herokuapp.com/trips").then((res) => {
            this.setState({trips: res.data})
        })
            .catch((errors) => {
                console.log(errors);
            });
    }

    componentDidMount() {
        this.getAllTrips();
    }*/

    /*handleSubmit = async (e) => {
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
            })
            .catch((errors) => {
                console.log(errors);
            });
    }; */
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClick = (index) => {
        this.setState({selectedItem: index})
    }

    toggleForm = () => {
        this.setState(prevState => ({
            isFormActive: !prevState.isFormActive
        }));
    }

    render() {
        return (
            <div>
                <ul className={styles.stepList}>

                    {this.state.steps.map((step, index) => {
                        return <li key={index}>
                            <div className={styles.stepBody}>
                                <div
                                    className={styles.listItem}
                                    style={{
                                        backgroundColor: this.state.selectedItem === index && "#132C33",
                                        color: this.state.selectedItem === index && "#fff"
                                    }}
                                    onClick={() => this.handleClick(index)}>
                                    {index + 1}
                                </div>
                                <div style={{display: this.state.selectedItem !== index && "none"}}
                                     className={styles.stepCard}>
                                    <div className="flex mb-2">
                                        <div className="mr-2"><img src={BuildingSVG} alt=""/></div>
                                        <div>City</div>
                                    </div>
                                    <div className="flex mb-2 items-center">
                                        <div className="mr-2"><img src={Flag} alt=""/></div>
                                        <div>15/05/2021</div>
                                    </div>
                                    <div className="text-sm italic">lorem ipsum dolor sit amet lorem ipsum dolor sit
                                        ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet
                                    </div>
                                </div>
                            </div>
                        </li>

                    })}
                    <li>
                        <div className={styles.stepBody}>
                            <div
                                className={styles.listItem}
                                onClick={this.toggleForm}
                                style={{
                                    backgroundColor: this.state.isFormActive && "#132C33",
                                    color: this.state.isFormActive && "#fff"
                                }}
                            >
                                +
                            </div>
                            <div style={{display: !this.state.isFormActive && "none"}}
                                 className={styles.stepCard}>
                                <form onSubmit={this.handleSubmit} className="flex flex-col  justify-center w-full p-2">
                                    <div className={formStyles.row}>
                                        <label htmlFor="stepName">Step Name</label>
                                        <input
                                            name="stepName"
                                            className={formStyles.input}
                                            placeholder="Step Name"
                                            type="text"
                                            value={this.state.stepName}
                                            onChange={this.handleChange}

                                        />
                                    </div>
                                    <div className={formStyles.row}>
                                        <label htmlFor="stepSummary">Step Summary</label>
                                        <textarea
                                            className={formStyles.input}
                                            name="stepSummary"
                                            placeholder="e.g. awesome place"
                                            rows="3"
                                            value={this.state.stepSummary}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className={formStyles.row}>
                                        <label htmlFor="stepOrder">Step Order</label>
                                        <input
                                            name="stepOrder"
                                            className={formStyles.input}
                                            placeholder="Step Order"
                                            type="text"
                                            value={this.state.stepOrder}
                                            onChange={this.handleChange}

                                        />
                                    </div>
                                    <div className={formStyles.row}>
                                        <label htmlFor="location">Location</label>
                                        <input
                                            name="location"
                                            className={formStyles.input}
                                            placeholder="Location"
                                            type="text"
                                            value={this.state.location}
                                            onChange={this.handleChange}

                                        />
                                    </div>
                                    <div className={formStyles.row}>
                                        <label htmlFor="stepStartDate">Start Date</label>
                                        <input
                                            name="stepStartDate"
                                            type="datetime-local"
                                            placeholder="15/01/2021"
                                            className={formStyles.input}
                                            value={this.state.stepStartDate}
                                            onChange={this.handleChange}


                                        />
                                    </div>


                                    <div className="self-center">
                                        <input type="submit" className={formStyles.saveButton} value="Create Step"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </li>
                </ul>

            </div>
        );
    }
}

export default StepSidebar;