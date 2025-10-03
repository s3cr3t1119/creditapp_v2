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
                <Label htmlFor={`${basePath}.aptUnit`}>APT</Label>
                <Input
                  id={`${basePath}.aptUnit`}
                  {...form.register(`${basePath}.aptUnit`)}
                  placeholder="APT"
                />
              </div>

              <div className='w-full md:w-[75%]'>
                <Label htmlFor={`${basePath}.zipCode`}>Zip Code *</Label>
                <div className="relative">
                  <Input
                    id={`${basePath}.zipCode`}
                    {...form.register(`${basePath}.zipCode`)}
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
                {getFieldError(form.formState.errors, `${basePath}.zipCode`) && (
                  <p className="text-sm text-red-600 mt-1">
                    {getFieldError(form.formState.errors, `${basePath}.zipCode`)}
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
              <Select
                value={form.watch(`${basePath}.state`)}
                onValueChange={(value) => form.setValue(`${basePath}.state`, value)}
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
              <Label htmlFor={`${basePath}.dateOfBirth`}>Date of Birth *</Label>
              <Input
                id={`${basePath}.dateOfBirth`}
                type="date"
                {...form.register(`${basePath}.dateOfBirth`)}
              />
              {getFieldError(form.formState.errors, `${basePath}.dateOfBirth`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${basePath}.dateOfBirth`)}
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
                  <Label htmlFor={`${basePath}.driverLicenseNo`}>Driver License No *</Label>
                  <Input
                    id={`${basePath}.driverLicenseNo`}
                    {...form.register(`${basePath}.driverLicenseNo`)}
                    placeholder="Driver License No"
                  />
                  {getFieldError(form.formState.errors, `${basePath}.driverLicenseNo`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${basePath}.driverLicenseNo`)}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`${basePath}.driverLicenseState`}>Driver License State *</Label>
                  <Select
                    value={form.watch(`${basePath}.driverLicenseState`)}
                    onValueChange={(value) => form.setValue(`${basePath}.driverLicenseState`, value)}
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
                  {getFieldError(form.formState.errors, `${basePath}.driverLicenseState`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${basePath}.driverLicenseState`)}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`${basePath}.driverLicenseExpiration`}>Driver License Expiration *</Label>
                  <Input
                    id={`${basePath}.driverLicenseExpiration`}
                    type="date"
                    {...form.register(`${basePath}.driverLicenseExpiration`)}
                  />
                  {getFieldError(form.formState.errors, `${basePath}.driverLicenseExpiration`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${basePath}.driverLicenseExpiration`)}
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
