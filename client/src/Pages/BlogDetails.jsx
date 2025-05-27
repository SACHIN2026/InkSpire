"use client"

import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "../api/axios"
import { useSelector } from "react-redux"
import { useNotification } from "../context/NotificationContext"

const BlogDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const { user, token, isAuthenticated } = useSelector((state) => state.auth)
  const { showNotification } = useNotification()
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/blogs/${id}`)
        setBlog(res.data.blog)
        setLikeCount(res.data.blog.likes?.length || 0)

        // Check if user has liked this blog
        if (isAuthenticated && token) {
          try {
            const likeRes = await axios.get(`/blogs/${id}/like`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            setIsLiked(likeRes.data.isLiked)
          } catch (err) {
            console.error("Error checking like status:", err)
          }

          // Check if user has bookmarked this blog
          try {
            const bookmarkRes = await axios.get(`/bookmarks/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            setIsBookmarked(bookmarkRes.data.bookmarked)
          } catch (err) {
            console.error("Error checking bookmark status:", err)
          }
        }

        setError(null)
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to fetch blog"
        console.error("Error fetching blog:", msg)
        setError(msg)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [id, isAuthenticated, token])

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Check if user is the author
  const isAuthor = user && blog?.author?._id === user._id

  // Handle delete blog
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return

    try {
      setIsDeleting(true)
      await axios.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      showNotification("success", "Blog deleted successfully")
      navigate("/blogs")
    } catch (error) {
      console.error("Error deleting blog:", error)
      showNotification("error", "Failed to delete blog")
    } finally {
      setIsDeleting(false)
    }
  }

  // Handle like/unlike
  const handleLike = async () => {
    if (!isAuthenticated) {
      showNotification("info", "Please login to like this blog")
      return navigate("/login")
    }

    try {
      const res = await axios.post(
        `/blogs/${id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      setIsLiked(res.data.liked)
      setLikeCount(res.data.likeCount)
      showNotification("success", res.data.liked ? "Blog liked!" : "Blog unliked")
    } catch (error) {
      console.error("Error liking blog:", error)
      showNotification("error", "Failed to like blog")
    }
  }

  // Handle bookmark/unbookmark
  const handleBookmark = async () => {
    if (!isAuthenticated) {
      showNotification("info", "Please login to bookmark this blog")
      return navigate("/login")
    }

    try {
      const res = await axios.post(
        `/bookmarks`,
        { blogId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      setIsBookmarked(res.data.bookmarked)
      showNotification("success", res.data.bookmarked ? "Blog bookmarked!" : "Blog removed from bookmarks")
    } catch (error) {
      console.error("Error bookmarking blog:", error)
      showNotification("error", "Failed to bookmark blog")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="alert alert-error mb-4">
          <i className="fa-solid fa-circle-exclamation"></i>
          <span>{error}</span>
        </div>
        <Link to="/blogs" className="btn btn-ghost btn-sm">
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back to blogs
        </Link>
      </div>
    )
  }

  if (!blog) return null

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <Link to="/blogs" className="btn btn-ghost btn-sm mb-4">
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back to blogs
        </Link>

        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {blog.title}
        </motion.h1>

        <motion.div
          className="flex flex-wrap items-center gap-4 opacity-70 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-user"></i>
            <Link to={`/profile/${blog.author?._id}`} className="hover:text-primary hover:underline">
              {blog.author?.username || "Anonymous"}
            </Link>
          </div>

          {blog.createdAt && (
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-calendar"></i>
              <span>{formatDate(blog.createdAt)}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <i className="fa-solid fa-eye"></i>
            <span>{blog.views} views</span>
          </div>

          <div className="flex items-center gap-2">
            <i className="fa-solid fa-heart"></i>
            <span>{likeCount} likes</span>
          </div>
        </motion.div>

        {blog.tags && blog.tags.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {blog.tags.map((tag, index) => (
              <span key={index} className="badge badge-outline">
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {isAuthor && (
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to={`/editor/${id}`} className="btn btn-ghost btn-sm" title="Edit blog">
              <i className="fa-solid fa-edit mr-1"></i>
              <span className="hidden sm:inline">Edit</span>
            </Link>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="btn btn-ghost btn-sm text-error"
              title="Delete blog"
            >
              <i className="fa-solid fa-trash mr-1"></i>
              <span className="hidden sm:inline">{isDeleting ? "Deleting..." : "Delete"}</span>
            </button>
          </motion.div>
        )}
      </div>

      <motion.div
        className="prose prose-lg max-w-none mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Action buttons */}
      <motion.div
        className="flex flex-wrap gap-4 mt-8 border-t pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button onClick={handleLike} className={`btn ${isLiked ? "btn-primary" : "btn-outline"}`}>
          <i className={`fa-${isLiked ? "solid" : "regular"} fa-heart mr-2`}></i>
          {isLiked ? "Liked" : "Like"}
        </button>

        <button onClick={handleBookmark} className={`btn ${isBookmarked ? "btn-secondary" : "btn-outline"}`}>
          <i className={`fa-${isBookmarked ? "solid" : "regular"} fa-bookmark mr-2`}></i>
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: blog.title,
                  text: `Check out this blog: ${blog.title}`,
                  url: window.location.href,
                })
                .catch((err) => console.error("Error sharing:", err))
            } else {
              navigator.clipboard.writeText(window.location.href)
              showNotification("success", "Link copied to clipboard!")
            }
          }}
          className="btn btn-outline"
        >
          <i className="fa-solid fa-share-alt mr-2"></i>
          Share
        </button>
      </motion.div>
    </motion.div>
  )
}

export default BlogDetails
