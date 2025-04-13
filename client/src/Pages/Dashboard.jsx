import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await axios.get('/blogs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Retrieve the user info from localStorage,
        // assuming it was stored there after login/register.
        const storedUser = JSON.parse(localStorage.getItem("user"));
        // Filter blogs of the logged in user
        const myBlogs = res.data.blogs.filter((blog) =>
          blog.author._id === storedUser?._id
        );
        setUserBlogs(myBlogs);
      } catch (error) {
        console.error("Error fetching user blogs:", error.response?.data || error.message);
      }
    };

    if (token) {
      fetchUserBlogs();
    }
  }, [token]);

  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>My Dashboard</h1>
      <div className='flex justify-end mb-4'>
        <Link to="/editor" className='btn btn-primary'>
          Create New Blog
        </Link>
      </div>
      {userBlogs.length === 0 ? (
        <p>No blogs published.</p>
      ) : (
        <ul>
          {userBlogs.map((blog) => (
            <li key={blog._id} className='border p-4 mb-2'>
              <h2 className='text-2xl'>{blog.title}</h2>
              <p>{blog.content.substring(0, 100)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
