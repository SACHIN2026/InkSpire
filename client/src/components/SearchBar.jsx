"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function SearchBar({ onSearch, placeholder }) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.div
      className="relative w-full max-w-md mb-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div
        className={`flex items-center relative rounded-lg ${
          isFocused ? "ring-2 ring-primary" : ""
        } transition-all duration-200`}
      >
        <i className={`fa-solid fa-search absolute left-3 ${isFocused ? "text-primary" : "text-base-content/50"}`}></i>
        <input
          type="text"
          placeholder={placeholder || "Search..."}
          className="input input-bordered w-full pl-10"
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </motion.div>
  )
}
