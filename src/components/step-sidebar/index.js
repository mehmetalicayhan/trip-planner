import React, {Component} from 'react';
import styles from "./index.module.css";
import formStyles from "../addtrip-sidebar/index.module.css";
import BuildingSVG from "./buildings.svg";
import axios from "axios";

import {MAPBOX_TOKEN} from "../map";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import DeleteSVG from "./delete.svg";

class StepSidebar extends Component {
    //TODO: remove step and edit step order item

    state = {
        steps: [],
        selectedItem: 0,
        isFormActive: false,
        stepName: "",
        stepOrder: 0,
        location: {
            countryCode: "",
            detail: "",
            fullDetail: "",
            name: "",
        },
        stepSummary: "",
        stepStartDate: "",
        redirect: false,
        isMyProfile: false
    }

    getAllSteps = async () => {
        await axios.get(`https://trip-planner-mm.herokuapp.com/steps?tripId=${this.props.tripId}`).then((res) => {
            this.setState({steps: res.data})
        })
            .catch((errors) => {
                console.log(errors);
            });
    }
    checkUser = () => {
        axios.get(`https://trip-planner-mm.herokuapp.com/users/${this.props.userId}`).then((res) => {
            this.setState({user: res.data})
            const localStorageUserId = JSON.parse(localStorage.getItem("user")).id;
            if (localStorageUserId === res.data.id) {
                this.setState({isMyProfile: true})
            }
        })
            .catch((errors) => {
                console.log(errors);
            });
    }

    componentDidMount() {
        this.getAllSteps();

        this.checkUser();
    }

    handleChange = async e => {
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
    getPlaceNameByCoordinates = async () => {
        const URL = `https://api.tiles.mapbox.com/v4/geocode/mapbox.places/${this.props.lng},${this.props.lat}.json?access_token=${MAPBOX_TOKEN}`;
        const result = await axios.get(URL)
        if (result.data.features) {
            const feature = result.data.features;
            this.setState(
                {
                    location: {
                        countryCode: feature[feature.length - 1].properties.short_code,
                        detail: feature[feature.length - 2].place_name,
                        fullDetail: feature[feature.length - 1].place_name,
                        name: feature[feature.length - 1].place_name,
                    }
                })


        }

    }


    remove = async (id) => {
        const result = await axios.delete(`https://trip-planner-mm.herokuapp.com/steps/${id}`);
        if (result)
            await this.getAllSteps();
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        await this.getPlaceNameByCoordinates();
        const stepRequest = {
            description: this.state.stepSummary,
            name: this.state.stepName,
            startDate: this.state.stepStartDate,
            tripId: this.props.tripId,
            location: {
                countryCode: this.state.location.countryCode,
                detail: this.state.location.detail,
                fullDetail: this.state.location.fullDetail,
                latitude: this.props.lat,
                longitude: this.props.lng,
                name: this.state.location.name,
            }
        };
        await axios
            .post(
                "https://trip-planner-mm.herokuapp.com/steps",
                stepRequest
            )
            .then(() => {
                this.setState({redirect: true});
            })
            .catch((errors) => {
                console.log(errors);
            });

        await this.getAllSteps();
        this.setState({isFormActive: false})

    };


    render() {
        /* const redirect = this.state.redirect;
         if (redirect) {
             return <Redirect to="/" />
         }*/
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
                                    <div className="flex justify-between mb-2">
                                        <div className="flex">
                                            <div className="mr-2"><img src={BuildingSVG} alt=""/></div>
                                            <div>{step.location.detail}</div>
                                        </div>
                                        <button className="outline-none" onClick={() => this.remove(step.id)}>
                                            <img src={DeleteSVG} width={16} height={16} alt=""/></button>
                                    </div>
                                    <div className="flex mb-2 items-center">
                                        <div className="mr-2">
                                            <img
                                                src={`https://www.countryflags.io/${step.location.countryCode}/flat/32.png`}
                                                alt={step.location.detail}/>
                                        </div>
                                        <div>{new Date(step.startDate).toLocaleDateString()}</div>
                                    </div>
                                    <div className="text-sm italic">{step.description}
                                    </div>
                                </div>
                            </div>
                        </li>

                    })}
                    {this.state.isMyProfile && <li>
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
                                            value={`${this.props.lat.toFixed(3)} , ${this.props.lng.toFixed(3)}`}
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
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {lat, lng} = state.map;
    return {
        lat, lng
    }
}

export default connect(mapStateToProps)(StepSidebar);

