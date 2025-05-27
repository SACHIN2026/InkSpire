"use client"
import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Navbar from "./components/Navbar"
import Home from "./Pages/Home"
import Blogs from "./Pages/Blogs"
import Bookmarks from "./Pages/Bookmarks"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import BlogEditor from "./components/BlogEditor"
import BlogDetails from "./Pages/BlogDetails"
import Profile from "./Pages/Profile"
import NotFound from "./Pages/Notfound"
import ServerError from "./Pages/ServerError"
import Dashboard from "./Pages/Dashboard"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { useTheme } from "./context/ThemeContext"

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth)
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      <Navbar />
      <div className="container mx-auto py-8">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected routes */}
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <BlogEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/:id"
            element={
              <ProtectedRoute>
                <BlogEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <motion.div>
                <Profile />
              </motion.div>
            }
          />
          {/* Error pages */}
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/not-found" element={<NotFound />} />
          {/* Redirect unknown routes to not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
