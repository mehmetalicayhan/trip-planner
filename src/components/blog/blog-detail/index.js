import React, {useEffect, useState} from 'react';
import MDEditor from '@uiw/react-md-editor';
import axios from "axios";

const BlogDetail = (props) => {
    const [blog, setBlog] = useState({})
    const getBlogById = () => {
        axios.get(`https://trip-planner-mm.herokuapp.com/blogs?stepId=${props.match.params.id}`).then((res) => {
            setBlog(res.data);
        })
    }
    useEffect(() => {
        getBlogById();
    }, [])
    return (
        <div className="px-80 py-10">
            <MDEditor.Markdown source={blog.content}/>
        </div>
    );
};

export default BlogDetail;
