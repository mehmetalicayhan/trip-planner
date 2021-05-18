import styles from "./index.module.css";
import {Profile, Accept, Reject} from "../icons/index"
import axios from "axios";
import {Redirect} from "react-router-dom";
import React, {useState} from "react";

const FollowerCard = (props) => {
    const [redirect,setRedirect] = useState(false);
    const accept = (id) => {
        axios.post(`https://trip-planner-mm.herokuapp.com/users/follow/accept?userId=${id}`).then((res) => {
            setRedirect(true);
        })

    }

    const reject = (id) => {
        axios.post(`https://trip-planner-mm.herokuapp.com/users/reject?userId=${id}`).then((res) => {
            setRedirect(true);
        })
    }

    return (
        <div
            className="bg-custom-gray flex hover:bg-light-blue cursor-pointer items-center p-2 mx-1 my-2 shadow-lg border-dark-green">
            {redirect && <Redirect to={`/followers/${JSON.parse(localStorage.getItem("user")).id}`}/>}
            <div className={styles.image}><Profile width={24} height={24} style={{color: "white"}}/></div>
            <div className="flex flex-grow flex-col">
                <div className="text-xs text-dark-blue">{props.user && props.user.userName}</div>

                <div className="text-md">{props.user && (props.user.firstName + " " + props.user.lastName)}</div>
                <div className="text-xs text-dark-blue">Manisa, Turkey</div>
            </div>
            {
                (props.followStatus === 1 && !props.isFollowingCard) &&
                <div className="flex ml-8">
                    <button onClick={() => accept(props.user.id)} className="p-0 m-1 focus:outline-none"><Accept
                        className="hover:text-green-600 text-dark-blue z-100"
                        width={24} height={24}/></button>
                    <button onClick={() => reject(props.user.id)} className="p-0 m-1 focus:outline-none"><Reject
                        className="hover:text-red-600 text-dark-blue z-100"
                        width={24} height={24}/></button>
                </div>
            }
        </div>
    );
}
export default FollowerCard;