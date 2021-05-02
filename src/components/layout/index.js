import React from 'react';
import logo from "./logo.svg";
import styles from "./index.module.css";
import MainSidebar from "../main-sidebar";
import FollowerSidebar from "../follower-sidebar";
import AddTripSidebar from "../addtrip-sidebar";

import Map from "../map";
import {Link} from "react-router-dom";
import StepSidebar from "../step-sidebar";


const Index = (props) => (
    <div className={styles.wrapper}>
        <div className={styles.navbar}>
            <Link to="/"><img className={styles.logo} src={logo} alt=""/></Link>
            <input type="text" placeholder="Search" className={styles.search}/>
        </div>
        <div className="flex h-screen">
            <div className="sm:w-1/4 w-full  overflow-y-scroll">
                {props.type==='Main' &&
                <MainSidebar/>
                }
                {props.type==='Follower' &&
                <FollowerSidebar/>
                }
                {props.type==='AddTrip' &&
                <AddTripSidebar/>
                }
                {props.type==='Step' &&
                <StepSidebar/>
                }
            </div>
            <div className="sm:flex-auto none"><Map/></div>
        </div>
    </div>
);

export default Index;