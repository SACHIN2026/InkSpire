import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import {
    bookmarkBlog,
    getUserBookmarks,
    checkBookmarkStatus,
    removeBookmark,
} from "../controllers/bookmarkController.js"

const router = express.Router()

// Bookmark CRUD operations
router.post("/", protect, bookmarkBlog)
router.get("/", protect, getUserBookmarks)
router.get("/:blogId", protect, checkBookmarkStatus)
router.delete("/:blogId", protect, removeBookmark)

// (no other routes)

export default router
