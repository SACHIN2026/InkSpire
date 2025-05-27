"use client"

import { createContext, useContext, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const NotificationContext = createContext()
export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children, position = "bottom-right", duration = 3000 }) => {
  const [notifications, setNotifications] = useState([])

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const showNotification = (type, message) => {
    const id = Date.now()
    const newNotification = {
      id,
      type,
      message,
    }
    setNotifications((prev) => [...prev, newNotification])
    setTimeout(() => removeNotification(id), duration)
  }

  const positionClasses = {
    "top-right": "top-5 right-5",
    "top-left": "top-5 left-5",
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
  }

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <i className="fa-solid fa-circle-check text-lg"></i>
      case "error":
        return <i className="fa-solid fa-circle-exclamation text-lg"></i>
      case "info":
        return <i className="fa-solid fa-circle-info text-lg"></i>
      default:
        return <i className="fa-solid fa-circle-info text-lg"></i>
    }
  }

  const getAlertClass = (type) => {
    switch (type) {
      case "success":
        return "alert-success"
      case "error":
        return "alert-error"
      case "info":
        return "alert-info"
      default:
        return "alert-info"
    }
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className={`fixed z-50 ${positionClasses[position]} space-y-3 max-w-md`}>
        <AnimatePresence>
          {notifications.map(({ id, type, message }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: position.includes("top") ? -20 : 20, x: 0 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, x: position.includes("right") ? 100 : -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`alert ${getAlertClass(type)} shadow-lg`}
            >
              <div>
                {getIcon(type)}
                <span className="flex-1 text-sm font-medium">{message}</span>
                <button
                  onClick={() => removeNotification(id)}
                  className="btn btn-sm btn-circle btn-ghost"
                  aria-label="Close notification"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  )
}
