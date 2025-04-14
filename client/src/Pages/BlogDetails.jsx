import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setBlog(res.data.blog);
      } catch (error) {
        const msg = error.response?.data?.message || "Failed to fetch blog";
        console.error("Error fetching blog:", msg);
        setError(msg);
      }
    };
    fetchBlog();
  }, [id]);

  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;
  if (!blog) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="mb-4 text-gray-600">By {blog.author.username}</p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default BlogDetails;
