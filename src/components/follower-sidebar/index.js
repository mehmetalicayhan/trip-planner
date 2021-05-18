import React, {useEffect, useState} from 'react';
import styles from "./index.module.css";
import FollowerCard from "../follower-card";
import axios from "axios";


const FollowerSidebar = (props) => {
    const [followers, setFollowers] = useState([]);
    const getMyFollowers = () => {
        axios.get(`https://trip-planner-mm.herokuapp.com/users/followers`).then((res) => {
            setFollowers(res.data)
        })
    }

    useEffect(() => {
        getMyFollowers();
        console.log(props);
    }, []);

    return (<div>
            <div className="text-xl sticky top-0 z-40 p-3 bg-dark-blue text-white">Followers</div>
            {
                followers.map((item, index) => {
                    return item.followStatusId === 2 &&
                        <FollowerCard user={item.user} followStatus={item.followStatusId} key={index}/>
                })
            }
            <div className="text-xl sticky top-10 z-40 p-3 bg-dark-blue text-white">Follower Requests</div>
            {
                followers.map((item, index) => {
                    return item.followStatusId === 1 &&
                        <FollowerCard user={item.user} followStatus={item.followStatusId} key={index}/>
                })
            }

        </div>
    );
}

export default FollowerSidebar;