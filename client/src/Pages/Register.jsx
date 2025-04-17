import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import { useNotification } from '../context/NotificationContext';


const Register = () => {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', formData);
      showNotification("success", "Registered Successfully! Redirecting to Dashboard...");
      // Assume response contains: { token, user }
      console.log(res.data);
      dispatch(setCredentials(res.data));
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      showNotification("error", "Registration failed. Please try again." || error.response?.data?.message);
      console.error('Register error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-secondary">
      <form onSubmit={handleSubmit} className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="card-title justify-center">Register</h2>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" name="username" placeholder="Username" className="input input-bordered" onChange={handleChange} required />
        </div>
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
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
