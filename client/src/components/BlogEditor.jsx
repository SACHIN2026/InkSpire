import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";


const BlogEditor = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const navigate = useNavigate();

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
        const blogData = {
            title,
            content,
            tags: tags.split(",").map(tag => tag.trim()),
        };

        try {
            const token = localStorage.getItem("token");
            const res = axios.post("/api/blogs", blogData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Blog created successfully",res.data);
            //clear the local storage
            localStorage.removeItem('blogDraft');
            //redirect to the dashboard
            navigate("/dashboard");
        } catch (error) {
            console.error("Error creating blog", error);
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <form onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold mb-4">Create Blog Post</h1>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />

                <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />

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



export default BlogEditor;







