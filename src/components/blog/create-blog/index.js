import React, {useState} from 'react';
import MDEditor from '@uiw/react-md-editor';


const CreateBlog = () => {
    const [value, setValue] = useState("Hello World")

    return (
        <div className="w-full h-screen flex flex-col py-2">
            <MDEditor
                value={value}
                onChange={setValue}
            />
            <button className="bg-dark-blue text-sm text-white px-3 py-1 my-3 rounded-full self-center transition duration-500 ease-in-out hover:text-dark-green hover:bg-light-blue transform hover:-translate-y-0.5 hover:scale-105">Create Blog Page</button>
        </div>
    );
};

export default CreateBlog;
