'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export function SuccessPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Thank you!
            </h1>
            <p className="text-gray-600 mb-6">
              Your application was received successfully.
            </p>
            <p className="text-sm text-gray-500">
              We will contact you shortly.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
