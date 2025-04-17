import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children, position = "top-right", duration = 3000 }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const showNotification = (type, message) => {
    const id = Date.now();
    const newNotification = {
      id,
      type,
      message,
    };
    setNotifications((prev) => [...prev, newNotification]);
    setTimeout(() => removeNotification(id), duration);
  };

  const positionClasses = {
    "top-right": "top-5 right-5",
    "top-left": "top-5 left-5",
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className={`fixed z-50 ${positionClasses[position]} space-y-3`}>
        <AnimatePresence>
          {notifications.map(({ id, type, message }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`alert alert-${type} shadow-lg w-fit flex items-center gap-2`}
            >
              <span>{message}</span>
              <button
                onClick={() => removeNotification(id)}
                className="btn btn-sm btn-ghost btn-circle"
              >
                X
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
