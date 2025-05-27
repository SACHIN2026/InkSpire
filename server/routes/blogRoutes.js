import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
    getBlogById,
    likeBlog,
    checkLikeStatus,
} from "../controllers/blogController.js"

const router = express.Router()

// Blog CRUD operations
router.post("/", protect, createBlog)
router.get("/", getAllBlogs)
router.get("/:id", getBlogById)
router.put("/:id", protect, updateBlog)
router.delete("/:id", protect, deleteBlog)

// Like/unlike operations
router.post("/:id/like", protect, likeBlog)
router.get("/:id/like", protect, checkLikeStatus)

export default router
