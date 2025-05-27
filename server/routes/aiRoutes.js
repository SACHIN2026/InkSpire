import express from 'express';
import { suggestTitle, generateOutline, summarizeBlog } from '../controllers/aiController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/suggest-title', protect, suggestTitle);
router.post('/generate-outline', protect, generateOutline);
router.post('/summarize-blog', protect, summarizeBlog);

export default router;
