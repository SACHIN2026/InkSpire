import express from 'express';
import { getProfile, getUserProfile} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.get("/:id", getUserProfile);


export default router; 