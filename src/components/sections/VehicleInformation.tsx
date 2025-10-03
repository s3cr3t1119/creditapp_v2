'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormContext } from '@/components/FormProvider'
import { useCreditAppStore } from '@/lib/store'

export function VehicleInformation() {
  const { form } = useFormContext()
  const { config } = useCreditAppStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Vehicle Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <Label htmlFor="vehicleInfo.vehicle_title">Vehicle *</Label>
              <Select
                value={form.watch('vehicleInfo.vehicle_title')}
                onValueChange={(value) => form.setValue('vehicleInfo.vehicle_title', value)}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select Vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any Car">Any Car</SelectItem>
                  {/* Add more vehicle options here */}
                </SelectContent>
              </Select>
              {form.formState.errors.vehicleInfo?.vehicle_title && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.vehicleInfo.vehicle_title.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="vehicleInfo.sales_agent">Sales Agent</Label>
              <Select
                value={form.watch('vehicleInfo.sales_agent')}
                onValueChange={(value) => form.setValue('vehicleInfo.sales_agent', value)}
                disabled={!config.showAgents}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select Agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {/* Add agent options here */}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="vehicleInfo.down_payment">Down Payment *</Label>
              <Input
                id="vehicleInfo.down_payment"
                {...form.register('vehicleInfo.down_payment')}
                placeholder="Enter down payment amount"
              />
              {form.formState.errors.vehicleInfo?.down_payment && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.vehicleInfo.down_payment.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="vehicleInfo.trade_year">Trade in Year</Label>
              <Input
                id="vehicleInfo.trade_year"
                {...form.register('vehicleInfo.trade_year')}
                placeholder="Year"
              />
            </div>

            <div>
              <Label htmlFor="vehicleInfo.trade_make">Trade in Make</Label>
              <Input
                id="vehicleInfo.trade_make"
                {...form.register('vehicleInfo.trade_make')}
                placeholder="Make"
              />
            </div>

            <div>
              <Label htmlFor="vehicleInfo.trade_model">Trade in Model</Label>
              <Input
                id="vehicleInfo.trade_model"
                {...form.register('vehicleInfo.trade_model')}
                placeholder="Model"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
