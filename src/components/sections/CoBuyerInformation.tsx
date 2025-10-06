'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormContext } from '@/components/FormProvider'
import { useCreditAppStore } from '@/lib/store'
import { relationshipTypes } from '@/lib/schemas'
import { ClientInformation } from './ClientInformation'
import { ResidentialInformation } from './ResidentialInformation'
import { EmploymentInformation } from './EmploymentInformation'
import { getFieldError } from '@/lib/formHelpers'

export function CoBuyerInformation() {
  const { form } = useFormContext()
  const { config } = useCreditAppStore()

  const hasCoBuyer = form.watch('has_cobuyer')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Co-buyer Toggle */}
      <Card className='py-4 mb-0'>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 space-x-4">
            <div className='flex items-center gap-4'>
              <input
                type="checkbox"
                id="has_cobuyer"
                checked={hasCoBuyer}
                onChange={(e) => form.setValue('has_cobuyer', e.target.checked)}
                className="h-5 w-5 py-2 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label htmlFor="has_cobuyer" className="text-md font-medium pb-0">
                Has Co-buyer?
              </Label>
            </div>
            {hasCoBuyer && (
              <div>
                <Label htmlFor="coBuyerInfo.relationship">Relationship Type</Label>
                <Select
                  value={form.watch('coBuyerInfo.relationship')}
                  onValueChange={(value) => form.setValue('coBuyerInfo.relationship', value)}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select relationship type" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationshipTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {getFieldError(form.formState.errors, `coBuyerInfo.relationship`) && (
                  <p className="text-sm text-red-600 mt-1">
                    {getFieldError(form.formState.errors, `coBuyerInfo.relationship`)}
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Co-buyer Form Sections */}
      {hasCoBuyer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <ClientInformation section="cobuyer" />
          <ResidentialInformation section="cobuyer" />
          <EmploymentInformation section="cobuyer" />
        </motion.div>
      )}

      {!hasCoBuyer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12 text-gray-500"
        >
          <p className="text-lg">No co-buyer information required.</p>
          <p className="text-sm">Check the box above if you have a co-buyer.</p>
        </motion.div>
      )}
    </motion.div>
  )
}
