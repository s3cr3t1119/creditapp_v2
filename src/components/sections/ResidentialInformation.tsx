'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useFormContext } from '@/components/FormProvider'
import { useCreditAppStore } from '@/lib/store'
import { residenceTypes } from '@/lib/schemas'
import { getFieldError } from '@/lib/formHelpers'
import { Plus, RotateCcw, Trash2 } from 'lucide-react'

interface ResidentialInformationProps {
  section: 'buyer' | 'cobuyer'
}

export function ResidentialInformation({ section }: ResidentialInformationProps) {
  const { form } = useFormContext()
  const { config } = useCreditAppStore()

  const basePath = section === 'buyer' ? 'buyerInfo' : 'coBuyerInfo'
  const residentialPath = `${basePath}.residentialInfo`
  const previousResidencesPath = `${basePath}.previousResidences`

  const previousResidences = form.watch(previousResidencesPath as any) || []

  const addPreviousResidence = () => {
    if (previousResidences.length == 0) {
      form.setValue(previousResidencesPath as any, [
        {
          address: '',
          aptUnit: '',
          zipCode: '',
          city: '',
          state: '',
          years: '',
          months: '0',
          monthlyPayment: '',
          residenceType: ''
        }
      ])
    }
  }

  const removePreviousResidence = (index: number) => {
    form.setValue(previousResidencesPath as any, [])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Current Residential Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Residential Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`${residentialPath}.years`}>Years *</Label>
                  <Input
                    id={`${residentialPath}.years`}
                    {...form.register(`${residentialPath}.years`)}
                    placeholder="Years at address"
                  />
                  {getFieldError(form.formState.errors, `${residentialPath}.years`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${residentialPath}.years`)}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`${residentialPath}.months`}>Months</Label>
                  <Input
                    id={`${residentialPath}.months`}
                    {...form.register(`${residentialPath}.months`)}
                    placeholder="Months"
                    defaultValue="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor={`${residentialPath}.monthlyPayment`}>Monthly Payment</Label>
              <Input
                id={`${residentialPath}.monthlyPayment`}
                {...form.register(`${residentialPath}.monthlyPayment`)}
                placeholder="Monthly payment"
              />
            </div>

            <div>
              <Label htmlFor={`${residentialPath}.residenceType`}>Residence Type</Label>
              <Select
                value={form.watch(`${residentialPath}.residenceType`)}
                onValueChange={(value) => form.setValue(`${residentialPath}.residenceType`, value)}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {residenceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Previous Residences */}
      {/* {config.previousResidency && ( */}
      {true && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-semibold">
                Previous Residence
              </CardTitle>
              {previousResidences.length == 0 && (<Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPreviousResidence}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {previousResidences.map((residence: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`${previousResidencesPath}.${index}.address`}>Street Address *</Label>
                    <Input
                      {...form.register(`${previousResidencesPath}.${index}.address`)}
                      placeholder="Enter street address"
                    />
                    {getFieldError(form.formState.errors, `${previousResidencesPath}.${index}.address`) && (
                      <p className="text-sm text-red-600 mt-1">
                        {getFieldError(form.formState.errors, `${previousResidencesPath}.${index}.address`)}
                      </p>
                    )}
                  </div>
                  <div className='flex flex-col md:flex-row gap-4'>
                    <div className='w-full md:w-[25%]'>
                      <Label htmlFor={`${previousResidencesPath}.${index}.aptUnit`}>APT</Label>
                      <Input
                        {...form.register(`${previousResidencesPath}.${index}.aptUnit`)}
                        placeholder="APT"
                      />
                    </div>
                    <div className='w-full md:w-[75%]'>
                      <Label htmlFor={`${previousResidencesPath}.${index}.zipCode`}>Zip Code *</Label>
                      <div className="relative">
                        <Input
                          {...form.register(`${previousResidencesPath}.${index}.zipCode`)}
                          placeholder="Zip Code"
                          className='pr-10'
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
                      {getFieldError(form.formState.errors, `${previousResidencesPath}.${index}.zipCode`) && (
                        <p className="text-sm text-red-600 mt-1">
                          {getFieldError(form.formState.errors, `${previousResidencesPath}.${index}.zipCode`)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`${previousResidencesPath}.${index}.city`}>City *</Label>
                    <Input
                      {...form.register(`${previousResidencesPath}.${index}.city`)}
                      placeholder="City"
                    />
                    {getFieldError(form.formState.errors, `${previousResidencesPath}.${index}.city`) && (
                      <p className="text-sm text-red-600 mt-1">
                        {getFieldError(form.formState.errors, `${previousResidencesPath}.${index}.city`)}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor={`${previousResidencesPath}.${index}.state`}>State *</Label>
                    <Input
                      {...form.register(`${previousResidencesPath}.${index}.state`)}
                      placeholder="State"
                    />
                    {getFieldError(form.formState.errors, `${previousResidencesPath}.${index}.state`) && (
                      <p className="text-sm text-red-600 mt-1">
                        {getFieldError(form.formState.errors, `${previousResidencesPath}.${index}.state`)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`${previousResidencesPath}.${index}.years`}>Years *</Label>
                    <Input
                      {...form.register(`${previousResidencesPath}.${index}.years`)}
                      placeholder="Years"
                    />
                    {getFieldError(form.formState.errors, `${previousResidencesPath}.${index}.years`) && (
                      <p className="text-sm text-red-600 mt-1">
                        {getFieldError(form.formState.errors, `${previousResidencesPath}.${index}.years`)}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor={`${previousResidencesPath}.${index}.months`}>Months</Label>
                    <Input
                      {...form.register(`${previousResidencesPath}.${index}.months`)}
                      placeholder="Months"
                      defaultValue="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${previousResidencesPath}.${index}.monthlyPayment`}>Monthly Payment</Label>
                    <Input
                      {...form.register(`${previousResidencesPath}.${index}.monthlyPayment`)}
                      placeholder="Monthly payment"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${previousResidencesPath}.${index}.residenceType`}>Residence Type</Label>
                    <Select
                      value={form.watch(`${previousResidencesPath}.${index}.residenceType`)}
                      onValueChange={(value) => form.setValue(`${previousResidencesPath}.${index}.residenceType`, value)}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {residenceTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePreviousResidence(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
