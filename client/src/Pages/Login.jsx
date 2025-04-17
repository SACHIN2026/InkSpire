import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import { useNotification } from '../context/NotificationContext';

const Login = () => {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', formData);
      showNotification("success", "Logged in Successfully!");
      // Assume response contains: { token, user }
      dispatch(setCredentials(res.data));
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      showNotification("error", error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-secondary">
      <form onSubmit={handleSubmit} className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="card-title justify-center">Login</h2>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="Email" className="input input-bordered" onChange={handleChange} required />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="Password" className="input input-bordered" onChange={handleChange} required />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
