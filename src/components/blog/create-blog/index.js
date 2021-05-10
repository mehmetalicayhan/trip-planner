import React, {useState} from 'react';
import MDEditor from '@uiw/react-md-editor';
import axios from "axios";
import {Redirect} from "react-router-dom";


const CreateBlog = (props) => {
    const [value, setValue] = useState("Hello World")
    const [redirect, setRedirect] = useState(false);
    const createBlog = () => {
        const blogRequest = {
            content: value,
            date: new Date(Date.now()),
            image: props.location.image,
            stepId: props.match.params.id,
            summary: props.location.summary,
            title: props.location.blogName,
        };
        axios
            .post(
                "https://trip-planner-mm.herokuapp.com/blogs",
                blogRequest
            )
            .then(() => {
                setRedirect(true);
            })
            .catch((errors) => {
                console.log(errors);
            });


    };
    return (
        <div className="w-full h-screen flex flex-col py-2">
            {redirect && <Redirect to="/"/>}
            <MDEditor
                value={value}
                onChange={setValue}
            />
            <button onClick={createBlog}
                    className="bg-dark-blue text-sm text-white px-3 py-1 my-3 rounded-full self-center transition duration-500 ease-in-out hover:text-dark-green hover:bg-light-blue transform hover:-translate-y-0.5 hover:scale-105">Create
                Blog Page
            </button>
        </div>
    );
}
;

export default CreateBlog;
