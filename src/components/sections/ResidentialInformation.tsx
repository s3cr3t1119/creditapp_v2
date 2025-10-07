'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useFormContext } from '@/components/FormProvider'
import { ZipCodeInfo } from '@/lib/store'
import { residenceTypes } from '@/lib/schemas'
import { getFieldError } from '@/lib/formHelpers'
import { Plus, RotateCcw, Trash2 } from 'lucide-react'
import { getZipCode } from '@/lib/utils'
import { ZipCodeSelectionModal } from '../ZipCodeSelectionModal'

interface ResidentialInformationProps {
  section: 'buyer' | 'cobuyer'
}

export function ResidentialInformation({ section }: ResidentialInformationProps) {
  const { form } = useFormContext()

  // Modal state for zip code selection
  const [isZipModalOpen, setIsZipModalOpen] = useState(false)
  const [zipCodeItems, setZipCodeItems] = useState<ZipCodeInfo[]>([])
  const [currentZipCode, setCurrentZipCode] = useState('')
  const [currentType, setCurrentType] = useState('')

  const basePath = section === 'buyer' ? 'buyerInfo' : 'coBuyerInfo'
  const residentialPath = `${basePath}.residentialInfo`
  const previousResidencesPath = `${basePath}.previousResidences`

  const previousResidences = form.watch(previousResidencesPath as any) || []

  // Handle zip code lookup
  const handleZipCodeLookup = () => {
    const zip = form.watch(`${previousResidencesPath}.0.zip`)
    if (zip && zip.length === 5) {
      getZipCode(zip, `${previousResidencesPath}.0`, form, handleMultipleZipResults)
    }
  }

  // Handle multiple zip code results
  const handleMultipleZipResults = (items: ZipCodeInfo[], zip: string, type: string) => {
    setZipCodeItems(items)
    setCurrentZipCode(zip)
    setCurrentType(type)
    setIsZipModalOpen(true)
  }

  // Handle zip code selection from modal
  const handleZipCodeSelection = (item: ZipCodeInfo) => {
    form.setValue(`${currentType}.city`, item.city)
    form.setValue(`${currentType}.state`, item.state)
  }

  const addPreviousResidence = () => {
    if (previousResidences.length == 0) {
      form.setValue(previousResidencesPath as any, [
        {
          address: '',
          apt_unit: '',
          zip: '',
          city: '',
          state: '',
          res_years: '',
          res_months: '0',
          res_monthly_payment: '',
          residence: ''
        }
      ])
    }
  }

  const removePreviousResidence = () => {
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
                  <Label htmlFor={`${residentialPath}.res_years`}>Years *</Label>
                  <Input
                    id={`${residentialPath}.res_years`}
                    {...form.register(`${residentialPath}.res_years`)}
                    placeholder="Years at address"
                  />
                  {getFieldError(form.formState.errors, `${residentialPath}.res_years`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${residentialPath}.res_years`)}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`${residentialPath}.res_months`}>Months</Label>
                  <Input
                    id={`${residentialPath}.res_months`}
                    {...form.register(`${residentialPath}.res_months`)}
                    placeholder="Months"
                    defaultValue="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor={`${residentialPath}.res_monthly_payment`}>Monthly Payment</Label>
              <Input
                id={`${residentialPath}.res_monthly_payment`}
                {...form.register(`${residentialPath}.res_monthly_payment`)}
                placeholder="Monthly payment"
              />
            </div>

            <div>
              <Label htmlFor={`${residentialPath}.residence`}>Residence Type</Label>
              <Select
                value={form.watch(`${residentialPath}.residence`)}
                onValueChange={(value) => form.setValue(`${residentialPath}.residence`, value)}
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
                      <Label htmlFor={`${previousResidencesPath}.${index}.apt_unit`}>APT</Label>
                      <Input
                        {...form.register(`${previousResidencesPath}.${index}.apt_unit`)}
                        placeholder="APT"
                      />
                    </div>
                    <div className='w-full md:w-[75%]'>
                      <Label htmlFor={`${previousResidencesPath}.${index}.zip`}>Zip Code *</Label>
                      <div className="relative">
                        <Input
                          {...form.register(`${previousResidencesPath}.${index}.zip`)}
                          placeholder="Zip Code"
                          className='pr-10'
                          // onChange={handleZipCodeLookup}
                        />
                        <button
                          type="button"
                          onClick={handleZipCodeLookup}
                          className="absolute right-0 top-0 h-full px-3 bg-gray-100 hover:bg-gray-200 rounded-r-sm border border-l-0 border-gray-300 flex items-center justify-center transition-colors"
                        >
                          <RotateCcw className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      {getFieldError(form.formState.errors, `${previousResidencesPath}.${index}.zip`) && (
                        <p className="text-sm text-red-600 mt-1">
                          {getFieldError(form.formState.errors, `${previousResidencesPath}.${index}.zip`)}
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
                    <Label htmlFor={`${previousResidencesPath}.${index}.res_years`}>Years *</Label>
                    <Input
                      {...form.register(`${previousResidencesPath}.${index}.res_years`)}
                      placeholder="Years"
                    />
                    {getFieldError(form.formState.errors, `${previousResidencesPath}.${index}.res_years`) && (
                      <p className="text-sm text-red-600 mt-1">
                        {getFieldError(form.formState.errors, `${previousResidencesPath}.${index}.res_years`)}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor={`${previousResidencesPath}.${index}.res_months`}>Months</Label>
                    <Input
                      {...form.register(`${previousResidencesPath}.${index}.res_months`)}
                      placeholder="Months"
                      defaultValue="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${previousResidencesPath}.${index}.res_monthly_payment`}>Monthly Payment</Label>
                    <Input
                      {...form.register(`${previousResidencesPath}.${index}.res_monthly_payment`)}
                      placeholder="Monthly payment"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${previousResidencesPath}.${index}.residence`}>Residence Type</Label>
                    <Select
                      value={form.watch(`${previousResidencesPath}.${index}.residence`)}
                      onValueChange={(value) => form.setValue(`${previousResidencesPath}.${index}.residence`, value)}
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
                    onClick={() => removePreviousResidence()}
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

      {/* Zip Code Selection Modal */}
      <ZipCodeSelectionModal
        isOpen={isZipModalOpen}
        onClose={() => setIsZipModalOpen(false)}
        onSelect={handleZipCodeSelection}
        items={zipCodeItems}
        zipCode={currentZipCode}
      />
    </motion.div>
  )
}
