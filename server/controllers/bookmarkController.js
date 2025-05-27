import Bookmark from "../models/Bookmark.js"
import Blog from "../models/Blog.js"

// Bookmark a blog
export const bookmarkBlog = async (req, res) => {
  try {
    const { blogId } = req.body

    // Check if blog exists
    const blog = await Blog.findById(blogId)
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" })
    }

    // Check if already bookmarked
    const existingBookmark = await Bookmark.findOne({
      user: req.user._id,
      blog: blogId,
    })

    if (existingBookmark) {
      // Remove bookmark
      await Bookmark.findByIdAndDelete(existingBookmark._id)
      return res.status(200).json({ bookmarked: false })
    }

    // Create new bookmark
    const bookmark = await Bookmark.create({
      user: req.user._id,
      blog: blogId,
    })

    res.status(201).json({ bookmarked: true, bookmark })
  } catch (error) {
    // Handle duplicate key error (user already bookmarked this blog)
    if (error.code === 11000) {
      return res.status(400).json({ message: "Blog already bookmarked" })
    }
    res.status(500).json({ message: error.message })
  }
}

// Get all bookmarks for current user
export const getUserBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id })
      .populate({
        path: "blog",
        populate: { path: "author", select: "username" },
      })
      .sort({ createdAt: -1 })

    // Extract the blogs from bookmarks
    const blogs = bookmarks.map((bookmark) => bookmark.blog)

    res.status(200).json({ blogs })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Check if a blog is bookmarked by the current user
export const checkBookmarkStatus = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      user: req.user._id,
      blog: req.params.blogId,
    })

    res.status(200).json({ bookmarked: !!bookmark })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Remove a bookmark
export const removeBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      user: req.user._id,
      blog: req.params.blogId,
    })

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" })
    }

    res.status(200).json({ message: "Bookmark removed successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
