import TravelJPG from "./travel.jpeg";
import {Link} from "react-router-dom";
import formStyles from "../../addtrip-sidebar/index.module.css";
import React, {useState} from "react";

const BlogPopup = (props) => {

    const [blogName, setBlogName] = useState("");
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [image, setImage] = useState("");


    return (
        <div>
            {!props.step.blogAvailable && (
                <div className="px-2 py-3 flex flex-col">
                    <div className="my-1 font-bold">{props.step.name}</div>
                    <div className="italic my-1 text-sm text-dark-green">{props.step.description}</div>
                    <img src={TravelJPG} alt="TravelImage"/>
                    <Link to={`/blog/${props.step.id}`}
                          className="bg-dark-blue text-sm text-white px-3 py-1 rounded-full self-center mt-3 transition duration-500 ease-in-out hover:text-dark-green hover:bg-light-blue transform hover:-translate-y-0.5 hover:scale-105">Go
                        to blog !</Link>
                </div>
            )}

            {props.step.blogAvailable && (
                <div className="flex flex-col">
                    <div className={formStyles.row}>
                        <label htmlFor="blogName">Blog Name</label>
                        <input
                            name="blogName"
                            className={formStyles.input}
                            placeholder="Blog Name"
                            type="text"
                            value={blogName}
                            onChange={e => setBlogName(e.target.value)}
                        />
                    </div>
                    <div className={formStyles.row}>
                        <label htmlFor="blogTitle">Blog Title</label>
                        <input
                            className={formStyles.input}
                            name="blogTitle"
                            placeholder="Blog Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className={formStyles.row}>
                        <label htmlFor="blogImage">Blog Image</label>
                        <input
                            name="blogImage"
                            className={formStyles.input}
                            placeholder="Blog Image"
                            type="file"
                            value={image}
                            onChange={e => setImage(e.target.value)}

                        />
                    </div>

                    <div className={formStyles.row}>
                        <label htmlFor="blogSummary">Blog Summary</label>
                        <textarea
                            name="blogSummary"
                            className={formStyles.input}
                            rows={3}
                            placeholder="e.g. welcome my blog"
                            value={summary}
                            onChange={e => setSummary(e.target.value)}

                        />
                    </div>

                    <Link to={{
                        pathname: `/create-blog/${props.step.id}`,
                        blog: {
                            blogName, title, summary, image
                        }
                    }}
                          className="bg-dark-blue text-sm text-white px-3 py-1 rounded-full self-center mt-3 transition duration-500 ease-in-out hover:text-dark-green hover:bg-light-blue transform hover:-translate-y-0.5 hover:scale-105">Create
                        Blog !</Link>
                </div>
            )}

        </div>
    )

};

export default BlogPopup;
