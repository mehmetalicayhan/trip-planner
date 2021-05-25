import React, {useEffect, useState} from 'react';
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
import axios from "axios";
import FollowingSidebar from "../following-sidebar";
import SvgShowMap from "../icons/ShowMap";

const Index = (props) => {
    const [filteredData, setFilteredData] = useState([]);
    const [term, setTerm] = useState("");
    const [showMap, setShowMap] = useState(true);

    const search = (term) => {
        setTerm(term);
        axios.get(`https://trip-planner-mm.herokuapp.com/users/search/${term}`).then((res) => {
            setFilteredData(res.data)
        })
            .catch((errors) => {
                if (term === "")
                    setFilteredData([]);
            });
    }

    const handleShowMap = () => {
        console.log(showMap)
        setShowMap(!showMap);
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.navbar}>
                <div className="flex items-center">
                    <Link to={`/user/${JSON.parse(localStorage.getItem("user")).id}`}><img className={styles.logo}
                                                                                           src={logo} alt=""/></Link>
                    <div className="flex z-50 flex-col">
                        <input type="text" value={term} onKeyUp={e => search(e.target.value)}
                               onChange={e => setTerm(e.target.value)} placeholder="Search"
                               className={styles.search}/>
                        {filteredData.length > 0 && <div className="flex relative w-56 top-12 flex-col bg-white">
                            {filteredData.map((item, index) => {
                                return <div className="hover:bg-custom-gray p-3" key={index}>
                                    <Link to={`/user/${item.id}`}>{item.firstName + " " + item.lastName}</Link>
                                </div>
                            })}

                            <div>
                            </div>
                        </div>
                        }

                    </div>


                </div>

                <div className="flex justify-center items-center">
                    <button onClick={handleShowMap} className="focus:outline-none"><SvgShowMap
                        width={24} height={24}/></button>
                    <button className="mx-3" onClick={logout}><img src={LogoutSVG} width={22} height={22} alt=""/>
                    </button>
                </div>

            </div>

            <div className="flex h-screen">
                <div className={showMap ? "sm:w-1/4 w-full  overflow-y-scroll" : "none"}>

                    {(showMap && props.type === 'Main') &&
                    <MainSidebar id={props.match.params.id}/>
                    }
                    {(showMap && props.type === 'Follower') &&
                    <FollowerSidebar id={props.match.params.id}/>
                    }
                    {(showMap && props.type === 'Following') &&
                    <FollowingSidebar id={props.match.params.id}/>
                    }
                    {(showMap && props.type === 'AddTrip') &&
                    <AddTripSidebar id={props.match.params.id}/>
                    }
                    {(showMap && props.type === 'Step') &&
                    <StepSidebar userId={props.match.params.userId} tripId={props.match.params.tripId}/>
                        // Show All Users
                    }
                </div>
                <div className={!showMap ? "flex-auto" : "sm:flex-auto none"}><Map
                    userId={props.match.params.id || props.match.params.userId}/>
                </div>
            </div>
        </div>
    );
};

export default Index;