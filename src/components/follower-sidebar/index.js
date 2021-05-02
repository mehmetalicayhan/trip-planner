import React from 'react';
import styles from "./index.module.css";
import ProfilePhoto from "./profile.svg"
import FollowerCard from "../follower-card";

const FollowerSidebar = (props) => (
    <div className="bg-indigo-900">
        <FollowerCard/>
        <FollowerCard/>
        <FollowerCard/>
        <FollowerCard/>
        <FollowerCard/>
        <FollowerCard/>
        <FollowerCard/>
        <FollowerCard/>
        <FollowerCard/>
    </div>
);

export default FollowerSidebar;