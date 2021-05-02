import React, {Component} from 'react';
import styles from "./index.module.css";
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

    handleClick = (index) => {
        this.setState({selectedItem: index})
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
                                    style={{backgroundColor: this.state.selectedItem === index && "#132C33",
                                        color: this.state.selectedItem === index && "#fff"}}
                                    onClick={() => this.handleClick(index)}>
                                    {step.a}
                                </div>
                                <div style={{display: this.state.selectedItem !== index && "none"}}
                                     className={styles.stepCard}>
                                    <div><span>B</span>City</div>
                                    <div>
                                        <div>flag</div>
                                        <div>15/05/2021</div>
                                    </div>
                                    <div>lorem ipsum dolor sit amet</div>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>


                {/*<div className="flex justify-center flex-col">
                    <h4 className="text-center underline text-sm my-2">Planned Trips</h4>
                    {this.state.trips.map((trip, key) => {
                        return <TravelCard key={key} trip={trip}/>
                    })}
                    <Link className={styles.createTrip} to="/add-trip">Create Trip</Link>
                </div>
                */}

            </div>
        );
    }
}

export default StepSidebar;