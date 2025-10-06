'use client'

import { motion } from 'framer-motion'

export function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-50"
      style={{ backgroundColor: '#f7f7f7' }}
    >
      <div className="text-center max-w-md mx-auto p-6">
        <img src="/img/not-found.png" alt="Data not found" />
      </div>
    </motion.div>
  )
}
