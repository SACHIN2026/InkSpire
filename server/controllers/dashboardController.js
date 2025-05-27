import Blog from "../models/Blog.js"
import Bookmark from "../models/Bookmark.js"
import mongoose from "mongoose"

export const getDashboardStats = async (req, res) => {
    try {
        // Only include current user's blogs
        const filter = { author: req.user._id }

        // Most viewed blogs
        const topViewedBlogs = await Blog.find(filter).sort({ views: -1 }).limit(5).select("title views").lean()

        // Most liked blogs
        const topLikedBlogs = await Blog.find(filter).sort({ likes: -1 }).limit(5).select("title likes").lean()

        // Recent blogs with view and like counts
        const recentBlogs = await Blog.find(filter)
            .sort({ createdAt: -1 })
            .limit(10)
            .select("title views likes createdAt")
            .lean()

        // Monthly blog creation stats
        const monthlyStats = await Blog.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    count: { $sum: 1 },
                    views: { $sum: "$views" },
                    likes: {
                        $sum: {
                            $cond: [
                                { $isArray: "$likes" },
                                { $size: "$likes" },
                                0
                            ]
                        }
                    }
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
        ])

        res.status(200).json({
            topViewedBlogs,
            topLikedBlogs,
            recentBlogs,
            monthlyStats,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get user-specific stats
export const getUserStats = async (req, res) => {
    try {
        // Total blogs by user
        const totalBlogs = await Blog.countDocuments({ author: req.user._id })

        // Total views of user's blogs
        const viewsResult = await Blog.aggregate([
            { $match: { author: new mongoose.Types.ObjectId(req.user._id) } },
            { $group: { _id: null, totalViews: { $sum: "$views" } } },
        ])

        const totalViews = viewsResult.length > 0 ? viewsResult[0].totalViews : 0

        // Total likes on user's blogs
        const likesResult = await Blog.aggregate([
            { $match: { author: new mongoose.Types.ObjectId(req.user._id) } },
            {
                $group: {
                    _id: null,
                    totalLikes: {
                        $sum: {
                            $cond: [
                                { $isArray: "$likes" },
                                { $size: "$likes" },
                                0
                            ]
                        }
                    }
                }
            },
        ])

        const totalLikes = likesResult.length > 0 ? likesResult[0].totalLikes : 0

        // Total bookmarks of user's blogs
        const bookmarksResult = await Bookmark.aggregate([
            {
                $lookup: {
                    from: "blogs",
                    localField: "blog",
                    foreignField: "_id",
                    as: "blogDetails",
                },
            },
            { $unwind: "$blogDetails" },
            { $match: { "blogDetails.author": new mongoose.Types.ObjectId(req.user._id) } },
            { $count: "totalBookmarks" },
        ])

        const totalBookmarks = bookmarksResult.length > 0 ? bookmarksResult[0].totalBookmarks : 0

        res.status(200).json({
            totalBlogs,
            totalViews,
            totalLikes,
            totalBookmarks,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}