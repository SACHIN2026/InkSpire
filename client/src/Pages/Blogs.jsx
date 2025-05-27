"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import axios from "../api/axios"
import SearchBar from "../components/SearchBar"

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/blogs")
        setBlogs(res.data.blogs || [])
        setError(null)
      } catch (err) {
        console.error("Error fetching blogs:", err.response?.data || err.message)
        setError("Failed to load blogs. Please try again later.")
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.content.toLowerCase().includes(search.toLowerCase()),
  )

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Extract plain text from HTML content
  const extractPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="container mx-auto px-4 py-8" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.h1 className="text-4xl font-bold mb-6 text-primary" variants={itemVariants}>
        Explore Blogs
      </motion.h1>

      <motion.div variants={itemVariants}>
        <SearchBar onSearch={setSearch} placeholder="Search blogs by title or content..." />
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : error ? (
        <motion.div className="alert alert-error" variants={itemVariants}>
          <i className="fa-solid fa-circle-exclamation"></i>
          <span>{error}</span>
        </motion.div>
      ) : filteredBlogs.length === 0 ? (
        <motion.div className="text-center py-12" variants={itemVariants}>
          <p className="text-xl">{search ? "No blogs matching your search." : "No blogs available yet."}</p>
          <Link to="/editor" className="mt-4 inline-block btn btn-primary">
            Create the first blog
          </Link>
        </motion.div>
      ) : (
        <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants}>
          <AnimatePresence>
            {filteredBlogs.map((blog) => (
              <motion.article
                key={blog._id}
                className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                layout
              >
                <div className="card-body">
                  <h2 className="card-title line-clamp-2">{blog.title}</h2>

                  <div className="flex items-center gap-2 text-sm opacity-70 mb-3">
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-user"></i>
                      <span>{blog.author?.username || "Anonymous"}</span>
                    </div>

                    {blog.createdAt && (
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-calendar"></i>
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                    )}
                  </div>

                  <p className="opacity-80 line-clamp-3 mb-4">{extractPlainText(blog.content).substring(0, 150)}...</p>

                  <div className="card-actions justify-between items-center">
                    <Link to={`/blogs/${blog._id}`} className="btn btn-primary btn-sm">
                      Read more
                    </Link>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {blog.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="badge badge-outline">
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 2 && <span className="badge badge-outline">+{blog.tags.length - 2}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Blogs
