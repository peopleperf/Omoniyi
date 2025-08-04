"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative group p-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 
                 border border-primary/20 backdrop-blur-sm hover:border-primary/40 
                 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        {/* Sun icon */}
        <motion.div
          initial={false}
          animate={{
            scale: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : -180,
            opacity: theme === "light" ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-5 w-5 text-yellow-500 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
        </motion.div>

        {/* Moon icon */}
        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 180,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-5 w-5 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
        </motion.div>
      </div>

      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
                   blur-xl transition-opacity duration-300"
        style={{
          background: theme === "light" 
            ? "radial-gradient(circle, rgba(250,204,21,0.3) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(96,165,250,0.3) 0%, transparent 70%)"
        }}
      />
    </motion.button>
  )
}
