"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create context
const ThemeContext = createContext()

// Custom hook for easy context usage
export const useTheme = () => useContext(ThemeContext)

// Provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("mytheme") // Default theme
  const [mounted, setMounted] = useState(false)

  // Apply theme function for consistent application
  const applyTheme = (selectedTheme) => {
    // This is critical for DaisyUI - set the data-theme attribute on the html element
    document.documentElement.setAttribute("data-theme", selectedTheme)
    localStorage.setItem("theme", selectedTheme)
    setTheme(selectedTheme)
  }

  // Toggle function
  const toggle = () => {
    const nextTheme = theme === "mytheme" ? "dark" : "mytheme"
    applyTheme(nextTheme)
  }

  // Initialize theme on mount
  useEffect(() => {
    // Check for stored theme
    const storedTheme = localStorage.getItem("theme")

    if (storedTheme) {
      applyTheme(storedTheme)
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      applyTheme(prefersDark ? "dark" : "mytheme")
    }

    // Set mounted to true to avoid hydration mismatch
    setMounted(true)

    // Add transition after initial load to avoid transition on page load
    setTimeout(() => {
      document.documentElement.classList.add("transition-colors")
      document.documentElement.classList.add("duration-300")
    }, 100)
  }, [])

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "mytheme")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [mounted])

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}
