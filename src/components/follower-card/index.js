import React from 'react';
import styles from "./index.module.css";
import ProfilePhoto from "./profile.svg"

const FollowerCard = (props) => (

    <div className="bg-indigo-100 flex justify-between items-center p-2 border border-indigo-900">
        <div className={styles.image}><img className="w-9 h-9" src={ProfilePhoto} alt=""/></div>
        <div>Mehmet Tayfur Ünal</div>
        <div>
            <button className="bg-indigo-900 text-white rounded-full p-2 text-xs">Requested</button>
        </div>
    </div>
);

export default FollowerCard;