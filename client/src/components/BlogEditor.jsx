import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useEffect, useState } from "react";


const BlogEditor = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        const savedContent = localStorage.getItem('blogDraft');
        if (savedContent) {
            setContent(savedContent);
        }
    }, []);




    //autosave

    useEffect(() => {
        const inverval = setInterval(() => {
            localStorage.setItem('blogDraft', content);
        }, 5000);

        //cleanup function
        return () => clearInterval(inverval);
    }, [content]);


    //handle change

    const handleEditorChange = (value) => {
        setContent(value);
    }

    //handle submit

    const handleSubmit = (e) => {
        e.preventDefault();
        //submit the content to the server
        console.log(content);
        //clear the local storage
        localStorage.removeItem('blogDraft');
        // setContent("");
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <form onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold mb-4">Create Blog Post</h1>
                <SimpleMDE
                    value={content}
                    onChange={handleEditorChange}
                    options={{
                        spellChecker: false,
                        placeholder: "Write your blog post here...",
                        autosave: {
                            enabled: false,
                        }
                    }}

                />
                <button type="submit"
                    className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-blue-700">
                    Submit Blog
                </button>
            </form>
        </div>

    );
};











