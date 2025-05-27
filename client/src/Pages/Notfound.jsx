"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const NotFound = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <div className="w-16 h-1 bg-primary mx-auto my-6"></div>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </motion.div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
        <Link to="/" className="btn btn-primary btn-lg">
          <i className="fa-solid fa-home mr-2"></i>
          Back to Home
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default NotFound
