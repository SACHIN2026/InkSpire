import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "../api/axios";
import { motion } from "framer-motion";

const Profile = () => {
  const { userId: paramId } = useParams();
  const { user: authUser, token } = useSelector(state => state.auth);
  const [fetchedUser, setFetchedUser] = useState(null);
  const userId = paramId || authUser?._id || fetchedUser?._id;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        let profileRes;
        if (paramId) {
          profileRes = await axios.get(`/users/${paramId}`);
        } else if (authUser) {
          // already have authUser from Redux
          setUser(authUser);
          return;
        } else if (token) {
          // fetch own profile
          profileRes = await axios.get('/users/profile', { headers: { Authorization: `Bearer ${token}` } });
        }
        if (profileRes?.data?.user) {
          setUser(profileRes.data.user);
          if (!paramId && !authUser) setFetchedUser(profileRes.data.user);
        } else {
          setError("User not found.");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Failed to load user profile.");
      }
    };
    loadUser();
  }, [paramId, authUser, token]);

  // Fetch user's published blogs
  useEffect(() => {
    if (!userId) return;
    axios
      .get(`/blogs?author=${userId}`)
      .then((res) => setBlogs(res.data.blogs || []))
      .catch((err) => console.error("Error fetching user blogs:", err));
  }, [userId]);

  if (error) {
    return (
      <div className="alert alert-error">
        <p>{error}</p>
        <button className="btn btn-primary mt-2" onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  if (!user) return <p>Loading…</p>;

  return (
    <motion.div
      className="max-w-2xl mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold">{user.username}</h1>
      <p className="text-neutral mb-4">{user.bio || "No bio yet."}</p>
      <h2 className="text-2xl font-semibold mb-2">Posts by {user.username}</h2>
      {blogs.length > 0 ? (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <Link key={blog._id} to={`/blogs/${blog._id}`} className="btn btn-ghost text-left">
              {blog.title}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center">No posts by this user yet.</p>
      )}
      <h2 className="text-2xl font-semibold mt-8 mb-2">Bookmarks</h2>
      {user.bookmarks && user.bookmarks.length > 0 ? (
        user.bookmarks.map((bookmark) => (
          <div key={bookmark._id} className="mb-4 p-4 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{bookmark.title}</h3>
            <p className="text-neutral">{bookmark.content}</p>
            <button
              className="btn btn-primary mt-2"
              onClick={() => navigate(`/blogs/${bookmark._id}`)}
            >
              Read More
            </button>
          </div>
        ))
      ) : (
        <p>No bookmarks available.</p>
      )}

    </motion.div>
  );
};

export default Profile;
