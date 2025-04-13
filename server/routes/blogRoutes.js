import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createBlog, updateBlog, deleteBlog, getAllBlogs } from '../controllers/blogController.js';

const router = express.Router();

// Create a new blog post
router.post('/', protect, createBlog);
router.get('/', getAllBlogs);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;

