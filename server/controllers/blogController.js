import Blog from "../models/Blog.js"
import Bookmark from "../models/bookmark.js"

// Create a blog
export const createBlog = async (req, res) => {
    try {
        const { title, content, tags } = req.body
        // Always publish blogs when created
        const blogStatus = "published"

        const blog = await Blog.create({
            title,
            content,
            tags,
            author: req.user._id,
            status: blogStatus,
        })

        res.status(201).json({ blog })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const { tag, author } = req.query
        const filter = {}

        // Apply optional filters: by tag or by author
        if (tag) filter.tags = tag
        if (author) filter.author = author

        const blogs = await Blog.find(filter)
            .populate("author", "username")
            .sort({ createdAt: -1 })

        res.status(200).json({ blogs })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get a blog by id
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "username")

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }

        // Increment view count
        blog.views += 1
        await blog.save()

        res.status(200).json({ blog })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Update a blog post by id
export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }

        // Only author can update the blog
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "You are not authorized to update this blog" })
        }

        // Remove any status change from request
        if (req.body.status) delete req.body.status

        Object.assign(blog, req.body)
        await blog.save()

        res.status(200).json({ blog })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Delete a blog post by id
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }

        // Only author can delete the blog
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "You are not authorized to delete this blog" })
        }

        await blog.deleteOne()

        // Also delete all bookmarks for this blog
        await Bookmark.deleteMany({ blog: req.params.id })

        res.status(200).json({ message: "Blog deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Like/unlike a blog
export const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }

        // Check if the blog is already liked by the user
        const isLiked = blog.likes.includes(req.user._id)

        if (isLiked) {
            // Unlike the blog
            blog.likes = blog.likes.filter((id) => id.toString() !== req.user._id.toString())
        } else {
            // Like the blog
            blog.likes.push(req.user._id)
        }

        await blog.save()

        res.status(200).json({
            liked: !isLiked,
            likeCount: blog.likes.length,
            blog,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Check if a blog is liked by the current user
export const checkLikeStatus = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }

        const isLiked = blog.likes.includes(req.user._id)

        res.status(200).json({ isLiked, likeCount: blog.likes.length })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
