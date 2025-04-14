import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createBlog, updateBlog, deleteBlog, getAllBlogs, getBlogById } from '../controllers/blogController.js';

const router = express.Router();

// Create a new blog post
router.post('/', protect, createBlog);
router.get('/:id', getBlogById);
router.get('/', getAllBlogs);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;

