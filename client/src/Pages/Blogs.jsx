import React, { useEffect, useState } from 'react'
import axios from '../api/axios';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("/blogs");
                setBlogs(res.data.blogs || []);
            } catch (error) {
                console.error("Error fetching blogs:", error.response?.data || error.message);
                setBlogs([]); // Set to empty array on error to avoid undefined state
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div>
            <h1 className='text-3xl font-bold mb-4'>Public Blogs</h1>
            {blogs.length === 0 ? (<p>No blogs available.</p>
            ) : (
                <ul className='mb-4'>
                    {blogs.map((blog) => (
                        <li key={blog._id} className='border p-4 mb-2'>
                            <h2 className='text-xl font-semibold'>{blog.title}</h2>
                            <p className='text-neutral'>{blog.author.username}</p>
                            <p>{blog.content.substring(0, 100)}...</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Blogs;
