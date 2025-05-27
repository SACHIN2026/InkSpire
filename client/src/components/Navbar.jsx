"use client"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../redux/authSlice"
import { useTheme } from "../context/ThemeContext"
import { motion } from "framer-motion"
import { useState } from "react"

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { theme, toggle } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-accent text-accent-content shadow-md"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="https://res.cloudinary.com/dvqu0s6lq/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1744490589/ChatGPT_Image_Apr_11_2025_05_09_20_PM_gi7pdo.png"
                alt="InkSpire Logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-xl font-bold">InkSpire</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div variants={itemVariants} className="hidden md:flex items-center space-x-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            {!isAuthenticated ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <div className="relative group">
                  <NavLink to={`/profile/${user?._id}`}>
                    <i className="fa-solid fa-user mr-1"></i>
                    Profile
                  </NavLink>
                </div>
                <button onClick={handleLogout} className="btn btn-sm btn-ghost">
                  Logout
                </button>
              </>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggle}
              className="btn btn-sm btn-circle btn-ghost"
              aria-label={theme === "mytheme" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "mytheme" ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
            </motion.button>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div variants={itemVariants} className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-sm btn-ghost btn-circle">
              {isMenuOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          {isMenuOpen && (
            <div className="flex flex-col py-2 space-y-1">
              <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/blogs" onClick={() => setIsMenuOpen(false)}>
                Blogs
              </MobileNavLink>
              {!isAuthenticated ? (
                <>
                  <MobileNavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </MobileNavLink>
                  <MobileNavLink to="/register" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </MobileNavLink>
                </>
              ) : (
                <>
                  <MobileNavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </MobileNavLink>
                  <MobileNavLink to={`/profile/${user?._id}`} onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </MobileNavLink>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="text-left px-4 py-2 hover:bg-accent-focus transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
              <div className="flex items-center justify-between px-4 py-2">
                <span>Theme</span>
                <button
                  onClick={toggle}
                  className="btn btn-sm btn-circle btn-ghost"
                  aria-label={theme === "mytheme" ? "Switch to dark mode" : "Switch to light mode"}
                >
                  {theme === "mytheme" ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.nav>
  )
}

// Desktop NavLink component
const NavLink = ({ to, children }) => (
  <Link to={to} className="btn btn-sm btn-ghost">
    {children}
  </Link>
)

// Mobile NavLink component
const MobileNavLink = ({ to, children, onClick }) => (
  <Link to={to} className="px-4 py-2 hover:bg-accent-focus transition-colors block" onClick={onClick}>
    {children}
  </Link>
)

export default Navbar
