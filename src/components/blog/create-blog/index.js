import React, {useEffect, useState} from 'react';
import MDEditor from '@uiw/react-md-editor';
import axios from "axios";
import {Redirect} from "react-router-dom";
import firebase from "../../../firebase";

const CreateBlog = (props) => {


        const [value, setValue] = useState("Hello World")
        const [redirect, setRedirect] = useState(false);
        const [imageUrls, setImageUrls] = useState([]);
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

        const getImagesById = () => {
            let storageRef = firebase.storage().ref();
            storageRef.child(`images/${props.match.params.id}/`).listAll().then((e) => {
                e.items.map((imageRef) => {
                    imageRef.getDownloadURL().then((url) => {
                        setImageUrls(imageUrls => imageUrls.concat(url));
                    })

                })

            });
        }

        useEffect(() => {
            getImagesById();
        }, [])
        const copyImageSrc = (img) => {
            navigator.clipboard.writeText(img);
        }

        return (
            <div className="w-full h-screen flex flex-col py-2">
                {redirect && <Redirect to={`/user/${JSON.parse(localStorage.getItem("user")).id}`}/>}
                <div className="flex">
                    {
                        imageUrls.map((item, index) => {
                            return <img className="mx-2 overflow-x-scroll cursor-pointer" alt={item.name}
                                        onClick={() => copyImageSrc(item)} src={item} key={index} width={200} height={200}/>
                        })
                    }
                </div>
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
