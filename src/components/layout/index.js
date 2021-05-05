import React from 'react';
import logo from "./logo.svg";
import styles from "./index.module.css";
import MainSidebar from "../main-sidebar";
import FollowerSidebar from "../follower-sidebar";
import AddTripSidebar from "../addtrip-sidebar";
import LogoutSVG from "./logout.svg";
import Map from "../map";
import {Link} from "react-router-dom";
import StepSidebar from "../step-sidebar";
import {logout} from "../../actions/authAction";


const Index = (props) => (
    <div className={styles.wrapper}>
        <div className={styles.navbar}>
            <div className="flex justify-center items-center">
                <Link to="/"><img className={styles.logo} src={logo} alt=""/></Link>
                <input type="text" placeholder="Search" className="p-2 rounded" />
            </div>
            <button className="mx-3" onClick={logout}><img src={LogoutSVG} width={22} height={22} alt=""/></button>
        </div>
        <div className="flex h-screen">
            <div className="sm:w-1/4 w-full  overflow-y-scroll">
                {props.type === 'Main' &&
                <MainSidebar/>
                }
                {props.type === 'Follower' &&
                <FollowerSidebar/>
                }
                {props.type === 'AddTrip' &&
                <AddTripSidebar/>
                }
                {props.type === 'Step' &&
                <StepSidebar id={props.match.params.id}/>
                }
            </div>
            <div className="sm:flex-auto none"><Map/></div>
        </div>
    </div>
);

export default Index;