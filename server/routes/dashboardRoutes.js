import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Define the endpoint '/dashboard'
router.get('/dashboard', protect, (req, res) => {
  // Fixed the typo: using req.user instead of require.user
  res.status(200).json({ message: `Welcome, ${req.user.username}` });
});

export default router;
