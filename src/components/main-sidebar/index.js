import React, {Component} from 'react';
import styles from "./index.module.css";
import ProfilePhoto from "./profile.svg"
import TravelCard from "../travel-card";
import {Link} from "react-router-dom";
import axios from "axios";

class MainSidebar extends Component {
    state = {
        trips: [],
        user:{}
    }

    getAllTrips = async () => {
        await axios.get("https://trip-planner-mm.herokuapp.com/trips").then((res) => {
            this.setState({trips: res.data})
        })
            .catch((errors) => {
                console.log(errors);
            });
    }

    componentDidMount() {
        this.getAllTrips();
        this.setState({user:JSON.parse(localStorage.getItem("user"))});
    }

    render() {
        return (
            <div>
                <div className="bg-dark-blue h-full flex flex-col justify-center items-center p-6">
                    <div className={styles.profilePhoto}>
                        <img src={ProfilePhoto} alt=""/>
                    </div>
                    <div className="mb-4 mt-2 text-white font-bold text-lg">
                        {this.state.user.firstName +" "+ this.state.user.lastName}
                    </div>
                    <div className="flex justify-around mt-4">
                        <button className={styles.followerButton}>100 FOLLOWERS</button>
                        <button className={styles.followerButton}>100 FOLLOWING</button>
                    </div>
                </div>

                <div className="flex justify-center flex-col">
                    <div className="text-center bg-dark-green h-12 text-lg text-white flex justify-around items-center">
                        <div>Planned Trips</div>
                        <Link className={styles.createTrip} to="/add-trip">Create Trip</Link>

                    </div>
                    {this.state.trips.map((trip, key) => {
                        return <TravelCard key={key} trip={trip}/>
                    })}
                </div>

            </div>
        );
    }
}

export default MainSidebar;