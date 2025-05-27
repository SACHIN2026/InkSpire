import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";
import { useNotification } from "../context/NotificationContext";

const Register = () => {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", formData);
      showNotification(
        "success",
        "Registered Successfully! Redirecting to Profile..."
      );
      dispatch(setCredentials(res.data));
      localStorage.setItem("token", res.data.token);
      navigate(`/profile/${res.data._id}`);
    } catch (err) {
      showNotification("error", err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center h-screen bg-secondary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form
        onSubmit={handleSubmit}
        className="card w-96 bg-base-100 shadow-xl p-6"
      >
        <h2 className="card-title justify-center">Register</h2>
        {/* form fields */}
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control mt-6">
          <motion.button
            type="submit"
            className="btn btn-primary w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Register
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Register;
