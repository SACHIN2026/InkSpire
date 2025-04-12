import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [message, setMessage] = useState('Loading...');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(res.data.message);
      } catch (error) {
        console.error('Dashboard error:', error.response?.data || error.message);
        setMessage('Error fetching data or unauthorized');
        navigate('/login');
      }
    };

    fetchDashboard();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-secondary">
      <h2 className="text-3xl font-bold mb-4 text-primary">Dashboard</h2>
      <p className="text-lg text-neutral">{message}</p>
    </div>
  );
};

export default Dashboard;
