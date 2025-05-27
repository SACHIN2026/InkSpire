import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import { getDashboardStats, getUserStats } from "../controllers/dashboardController.js"

const router = express.Router()

// Dashboard routes
router.get("/stats", protect, getDashboardStats)
router.get("/user-stats", protect, getUserStats)

export default router
