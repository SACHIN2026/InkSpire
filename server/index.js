import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import bookmarkRoutes from "./routes/bookmarkRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"

dotenv.config()
connectDB()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/blogs", blogRoutes)
app.use("/api/bookmarks", bookmarkRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/dashboard", dashboardRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" })
})

app.get("/", (req, res) => {
    res.send("InkSpire API Server")
})

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})
