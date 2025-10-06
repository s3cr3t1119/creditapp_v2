'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormContext } from '@/components/FormProvider'
import { useCreditAppStore } from '@/lib/store'
import { stateList } from '@/lib/schemas'
import { getFieldError } from '@/lib/formHelpers'
import { RotateCcw } from 'lucide-react'

interface ClientInformationProps {
  section: 'buyer' | 'cobuyer'
}

export function ClientInformation({ section }: ClientInformationProps) {
  const { form } = useFormContext()
  const { config } = useCreditAppStore()

  const basePath = section === 'buyer' ? 'buyerInfo.clientInfo' : 'coBuyerInfo.clientInfo'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Client Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`${basePath}.firstName`}>First Name *</Label>
              <Input
                id={`${basePath}.firstName`}
                {...form.register(`${basePath}.firstName`)}
                placeholder="Enter first name"
              />
              {getFieldError(form.formState.errors, `${basePath}.firstName`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${basePath}.firstName`)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor={`${basePath}.lastName`}>Last Name *</Label>
              <Input
                id={`${basePath}.lastName`}
                {...form.register(`${basePath}.lastName`)}
                placeholder="Enter last name"
              />
              {getFieldError(form.formState.errors, `${basePath}.lastName`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${basePath}.lastName`)}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor={`${basePath}.address`}>Street Address *</Label>
              <Input
                id={`${basePath}.address`}
                {...form.register(`${basePath}.address`)}
                placeholder="Enter street address"
              />
              {getFieldError(form.formState.errors, `${basePath}.address`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${basePath}.address`)}
                </p>
              )}
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='w-full md:w-[25%]'>
                <Label htmlFor={`${basePath}.apt_unit`}>APT</Label>
                <Input
                  id={`${basePath}.apt_unit`}
                  {...form.register(`${basePath}.apt_unit`)}
                  placeholder="APT"
                />
              </div>

              <div className='w-full md:w-[75%]'>
                <Label htmlFor={`${basePath}.zip`}>Zip Code *</Label>
                <div className="relative">
                  <Input
                    id={`${basePath}.zip`}
                    {...form.register(`${basePath}.zip`)}
                    placeholder="Zip Code"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      // Add refresh functionality here if needed
                      console.log('Refresh zip code lookup')
                    }}
                    className="absolute right-0 top-0 h-full px-3 bg-gray-100 hover:bg-gray-200 rounded-r-sm border border-l-0 border-gray-300 flex items-center justify-center transition-colors"
                  >
                    <RotateCcw className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                {getFieldError(form.formState.errors, `${basePath}.zip`) && (
                  <p className="text-sm text-red-600 mt-1">
                    {getFieldError(form.formState.errors, `${basePath}.zip`)}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor={`${basePath}.city`}>City *</Label>
              <Input
                id={`${basePath}.city`}
                {...form.register(`${basePath}.city`)}
                placeholder="City"
              />
              {getFieldError(form.formState.errors, `${basePath}.city`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${basePath}.city`)}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor={`${basePath}.state`}>State *</Label>
              <Input
                id={`${basePath}.state`}
                {...form.register(`${basePath}.state`)}
                placeholder="State"
              />
              {getFieldError(form.formState.errors, `${basePath}.state`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${basePath}.state`)}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor={`${basePath}.email`}>Email *</Label>
              <Input
                id={`${basePath}.email`}
                type="email"
                {...form.register(`${basePath}.email`)}
                placeholder="Enter email address"
              />
              {getFieldError(form.formState.errors, `${basePath}.email`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${basePath}.email`)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor={`${basePath}.homePhone`}>Home Phone *</Label>
              <Input
                id={`${basePath}.homePhone`}
                {...form.register(`${basePath}.homePhone`)}
                placeholder="Home Phone"
              />
              {getFieldError(form.formState.errors, `${basePath}.homePhone`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${basePath}.homePhone`)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor={`${basePath}.cellPhone`}>Cell Phone *</Label>
              <Input
                id={`${basePath}.cellPhone`}
                {...form.register(`${basePath}.cellPhone`)}
                placeholder="Cell Phone"
              />
              {getFieldError(form.formState.errors, `${basePath}.cellPhone`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${basePath}.cellPhone`)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor={`${basePath}.dob`}>Date of Birth *</Label>
              <Input
                id={`${basePath}.dob`}
                type="date"
                {...form.register(`${basePath}.dob`)}
              />
              {getFieldError(form.formState.errors, `${basePath}.dob`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${basePath}.dob`)}
                </p>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor={`${basePath}.ssn`}>SSN *</Label>
              <Input
                id={`${basePath}.ssn`}
                {...form.register(`${basePath}.ssn`)}
                placeholder="XXX-XX-XXXX"
              />
              {getFieldError(form.formState.errors, `${basePath}.ssn`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${basePath}.ssn`)}
                </p>
              )}
            </div>

            {/* {config.driverLicense && ( */}
            {true && (
              <>
                <div>
                  <Label htmlFor={`${basePath}.dlr_nro`}>Driver License No *</Label>
                  <Input
                    id={`${basePath}.dlr_nro`}
                    {...form.register(`${basePath}.dlr_nro`)}
                    placeholder="Driver License No"
                  />
                  {getFieldError(form.formState.errors, `${basePath}.dlr_nro`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${basePath}.dlr_nro`)}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`${basePath}.dlr_state`}>Driver License State *</Label>
                  <Select
                    value={form.watch(`${basePath}.dlr_state`)}
                    onValueChange={(value) => form.setValue(`${basePath}.dlr_state`, value)}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {stateList.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {getFieldError(form.formState.errors, `${basePath}.dlr_state`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${basePath}.dlr_state`)}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`${basePath}.dlr_expiration`}>Driver License Expiration *</Label>
                  <Input
                    id={`${basePath}.dlr_expiration`}
                    type="date"
                    {...form.register(`${basePath}.dlr_expiration`)}
                  />
                  {getFieldError(form.formState.errors, `${basePath}.dlr_expiration`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${basePath}.dlr_expiration`)}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
