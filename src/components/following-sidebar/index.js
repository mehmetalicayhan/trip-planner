import React, {useEffect, useState} from 'react';
import styles from "./index.module.css";
import FollowerCard from "../follower-card";
import axios from "axios";
import {Redirect} from "react-router-dom";


const FollowingSidebar = (props) => {
    const [following, setFollowing] = useState([]);
    const getMyFollowing = () => {
        axios.get(`https://trip-planner-mm.herokuapp.com/users/followings`).then((res) => {
            setFollowing(res.data)
            console.log("following")
        })
    }

    useEffect(() => {
        getMyFollowing();
    }, []);

    return (<div>
            <div className="text-xl sticky top-0 z-40 p-3 bg-dark-blue text-white">Following</div>
            {
                following.map((item, index) => {
                    return (
                        <FollowerCard isFollowingCard={true} user={item.user} followStatus={item.followStatusId}
                                      key={index}/>)
                })
            }

        </div>
    );
}

export default FollowingSidebar;