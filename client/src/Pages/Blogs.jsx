import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/blogs");
        setBlogs(res.data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error.response?.data || error.message);
        setBlogs([]);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Public Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <ul className="mb-4">
          {blogs.map((blog) => (
            <li key={blog._id} className="border p-4 mb-2">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-neutral">By {blog.author.username}</p>
              <p>
                {blog.content.substring(0, 100)}...
                <Link to={`/blogs/${blog._id}`} className="text-blue-600 ml-2 hover:underline">
                  Show More
                </Link>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Blogs;
