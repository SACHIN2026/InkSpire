import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar bg-primary text-primary-content p-4">
      <div className="flex-1 flex items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://res.cloudinary.com/dvqu0s6lq/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1744490589/ChatGPT_Image_Apr_11_2025_05_09_20_PM_gi7pdo.png"
            alt="InkSpire Logo"
            className="w-12 h-12"
          />
          <span className="text-xl font-bold">InkSpire</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
          {/* <li><Link to="/editor">Write Post</Link></li> */}
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </li>
            
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
