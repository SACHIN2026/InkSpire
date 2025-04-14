import React, { useState, useEffect } from "react";
import TiptapEditor from "../components/TiptapEditor";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const BlogEditor = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const navigate = useNavigate();

    // Load saved draft from localStorage on mount
    useEffect(() => {
        const savedDraft = localStorage.getItem("blogDraft");
        if (savedDraft) {
            setContent(savedDraft);
        }
    }, []);


    // Autosave content to localStorage every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            localStorage.setItem("blogDraft", content);
        }, 5000);
        return () => clearInterval(interval);
    }, [content]);



    // Save draft to localStorage on content change
    //   const handleEditorChange = (value) => {
    //     setContent(value);
    //     // Optionally, also update localStorage on every change (if desired)
    //     // localStorage.setItem("blogDraft", value);
    //   };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const blogData = {
            title,
            content,
            tags: tags.split(",").map((tag) => tag.trim()),
        };

        try {
            const token = localStorage.getItem("token");
            const res = await axios.post("/blogs", blogData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Blog created successfully", res.data);
            // Clear the autosaved draft and state
            localStorage.removeItem("blogDraft");
            setContent("");
            setTitle("");
            setTags("");
            // Redirect to the dashboard
            navigate("/dashboard");
        } catch (error) {
            console.error("Error creating blog", error.response?.data || error.message);
        }
    };

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
                {/* Use the TipTap editor component */}
                <TiptapEditor value={content} onChange={setContent} />
                <button
                    type="submit"
                    className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Submit Blog
                </button>
            </form>
        </div>
    );
};

export default BlogEditor;
