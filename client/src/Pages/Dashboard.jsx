"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import axios from "../api/axios"
import { useNotification } from "../context/NotificationContext"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [userStats, setUserStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token, user } = useSelector((state) => state.auth)
  const { showNotification } = useNotification()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)

        // Fetch dashboard stats
        const statsRes = await axios.get("/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        })

        // Fetch user-specific stats
        const userStatsRes = await axios.get("/dashboard/user-stats", {
          headers: { Authorization: `Bearer ${token}` },
        })

        setStats(statsRes.data)
        setUserStats(userStatsRes.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching stats:", err.response?.data || err.message)
        setError("Failed to load dashboard statistics")
        showNotification("error", "Failed to load dashboard statistics")
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchStats()
  }, [token, showNotification])

  // Format monthly data for line chart
  const formatMonthlyData = () => {
    if (!stats?.monthlyStats) return []

    return stats.monthlyStats.map((stat) => ({
      month: `${stat._id.year}-${stat._id.month}`,
      blogs: stat.count,
      views: stat.views,
      likes: stat.likes,
    }))
  }

  // Format top viewed blogs for bar chart
  const formatTopViewedData = () => {
    if (!stats?.topViewedBlogs) return []

    return stats.topViewedBlogs.map((blog) => ({
      name: blog.title.substring(0, 20) + (blog.title.length > 20 ? "..." : ""),
      views: blog.views,
    }))
  }

  // Format top liked blogs for bar chart
  const formatTopLikedData = () => {
    if (!stats?.topLikedBlogs) return []

    return stats.topLikedBlogs.map((blog) => ({
      name: blog.title.substring(0, 20) + (blog.title.length > 20 ? "..." : ""),
      likes: typeof blog.likes === "number" ? blog.likes : Array.isArray(blog.likes) ? blog.likes.length : 0, // Ensure likes is valid
    }))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <i className="fa-solid fa-circle-exclamation"></i>
        <span>{error}</span>
      </div>
    )
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Blogs" value={userStats?.totalBlogs || 0} icon="fa-blog" color="bg-primary" />
        <StatsCard title="Total Views" value={userStats?.totalViews || 0} icon="fa-eye" color="bg-secondary" />
        <StatsCard title="Total Likes" value={userStats?.totalLikes || 0} icon="fa-heart" color="bg-accent" />
        <StatsCard title="Total Bookmarks" value={userStats?.totalBookmarks || 0} icon="fa-bookmark" color="bg-info" />
      </div>

      {/* Monthly Blog Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Monthly Blog Activity</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formatMonthlyData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="blogs" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="views" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="likes" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Top Viewed and Liked Blogs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Viewed Blogs */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Top Viewed Blogs</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={formatTopViewedData()}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Liked Blogs */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Top Liked Blogs</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={formatTopLikedData()}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="likes" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Blogs Table */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Recent Blogs</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Views</th>
                  <th>Likes</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentBlogs?.map((blog) => (
                  <tr key={blog._id}>
                    <td>{blog.title}</td>
                    <td>{blog.views}</td>
                    <td>
                      {typeof blog.likes === "number"
                        ? blog.likes
                        : Array.isArray(blog.likes)
                          ? blog.likes.length
                          : 0}
                    </td>
                    <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Stats Card Component
const StatsCard = ({ title, value, icon, color }) => (
  <div className="card bg-base-100 shadow-lg">
    <div className="card-body">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className={`p-4 rounded-full ${color}`}>
          <i className={`fa-solid ${icon} text-white text-2xl`}></i>
        </div>
      </div>
    </div>
  </div>
)

export default Dashboard
