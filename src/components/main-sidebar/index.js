import React, {Component} from 'react';
import styles from "./index.module.css";
import ProfilePhoto from "./profile.svg"
import TravelCard from "../travel-card";
import {Link} from "react-router-dom";
import axios from "axios";

class MainSidebar extends Component {
    state = {
        trips: [],
        user: {},
        isMyProfile: false,
        isFollowing: false,
        isRequested: false,
        followersLength: 0,
        followingLength: 0,
    }

    getAllTrips = () => {
        axios.get(`https://trip-planner-mm.herokuapp.com/trips/user/${this.props.id}`).then((res) => {
            this.setState({trips: res.data})
        })
            .catch((errors) => {
                console.log(errors);
            });
    }

    follow = () => {
        axios.post(`https://trip-planner-mm.herokuapp.com/users/follow?userId=${this.props.id}`).then((res) => {
        })
            .catch((errors) => {
                console.log(errors);
            });
    }

    getUserById = () => {
        axios.get(`https://trip-planner-mm.herokuapp.com/users/${this.props.id}`).then((res) => {
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

    getMyFollowers = () => {
        axios.get(`https://trip-planner-mm.herokuapp.com/users/followers`).then((res) => {
            this.setState({followersLength: res?.data?.length})
        })
            .catch((errors) => {
                console.log(errors);
            });
    }
    getMyFollowing = () => {
        axios.get(`https://trip-planner-mm.herokuapp.com/users/followings`).then((res) => {
            this.setState({followingLength: res?.data?.length})
            const userId = this.props.id;
            res.data.forEach((item) => {
                if (item.followingUserId === userId && item.followStatusId === 1) {
                    this.setState({isRequested: true})
                }
                if (item.followingUserId === userId && item.followStatusId === 2) {
                    this.setState({isFollowing: true})
                }

            })

        })
            .catch((errors) => {
                console.log(errors);
            });
    }

    componentDidMount() {
        this.getAllTrips();
        this.getUserById();
        this.getMyFollowers();
        this.getMyFollowing();
        //this.setState({user: JSON.parse(localStorage.getItem("user"))});
    }

    render() {
        return (
            <div>
                <div className="bg-dark-blue h-full flex flex-col justify-center items-center p-6">
                    <div className={styles.profilePhoto}>
                        <img src={ProfilePhoto} alt=""/>
                    </div>
                    <div className="mb-4 mt-2 text-white font-bold text-lg">
                        {this.state.user.firstName !== undefined && this.state.user.firstName + " " + this.state.user.lastName}
                    </div>

                    {this.state.isMyProfile &&
                    <div className="flex justify-around mt-4">
                        <Link to={`/followers/${this.props.id}`}
                              className={styles.followerButton}>{this.state.followersLength} FOLLOWERS
                        </Link>
                        <Link to={`/following/${this.props.id}`}
                              className={styles.followerButton}>{this.state.followingLength} FOLLOWING
                        </Link>
                    </div>
                    }

                    {(!this.state.isMyProfile && !this.state.isFollowing && !this.state.isRequested) &&
                    <div>
                        <button onClick={this.follow} className={styles.followerButton}>Follow</button>
                    </div>}

                    {
                        this.state.isFollowing && <div>
                            <button disabled={true} className={styles.followerButton}>Followed</button>
                        </div>
                    }

                    {
                        this.state.isRequested && <div>
                            <button disabled={true} className={styles.followerButton}>Requested</button>
                        </div>
                    }

                </div>

                <div className="flex justify-center flex-col">
                    <div className="text-center bg-dark-green h-12 text-lg text-white flex justify-around items-center">
                        <div>Planned Trips</div>
                        {this.state.isMyProfile &&
                        <Link className={styles.createTrip} to={`/add-trip/${this.props.id}`}>Create Trip</Link>}

                    </div>
                    {this.state.trips.map((trip, key) => {
                        return <TravelCard key={key} userId={this.props.id} trip={trip}/>
                    })}
                </div>

            </div>
        );
    }
}

export default MainSidebar;