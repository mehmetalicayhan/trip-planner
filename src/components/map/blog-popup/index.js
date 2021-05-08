import React, {useState} from 'react';
import {step} from "./step";
import TravelJPG from "./travel.jpeg";
import {Link} from "react-router-dom";
const BlogPopup = () => {
    const [isBlogAvailable, setBlogAvailable] = useState(true);
    return (
        <div>
            {isBlogAvailable && (
                <div className="px-2 py-3 flex flex-col">
                    <div className="my-1 font-bold">{step.stepName}</div>
                    <div className="italic my-1 text-sm text-dark-green">{step.stepSummary}</div>
                    <img src={TravelJPG} alt="TravelImage"/>
                    <Link to="/create-blog" className="bg-dark-blue text-sm text-white px-3 py-1 rounded-full self-center mt-3 transition duration-500 ease-in-out hover:text-dark-green hover:bg-light-blue transform hover:-translate-y-0.5 hover:scale-105">Go to blog !</Link>
                </div>
            )}

        </div>
    )

};

export default BlogPopup;
