"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const ServerError = () => {
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
        <h1 className="text-9xl font-bold text-error">500</h1>
        <div className="w-16 h-1 bg-error mx-auto my-6"></div>
        <h2 className="text-3xl font-semibold mb-4">Server Error</h2>
        <p className="text-lg mb-8 max-w-md mx-auto">
          Sorry, something went wrong on our servers. We're working to fix the issue.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-x-4"
      >
        <Link to="/" className="btn btn-primary">
          <i className="fa-solid fa-home mr-2"></i>
          Back to Home
        </Link>
        <button onClick={() => window.location.reload()} className="btn btn-outline">
          <i className="fa-solid fa-rotate mr-2"></i>
          Refresh Page
        </button>
      </motion.div>
    </motion.div>
  )
}

export default ServerError
