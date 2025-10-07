'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useFormContext } from '@/components/FormProvider'
import { useCreditAppStore } from '@/lib/store'
import { employmentTypes } from '@/lib/schemas'
import { getFieldError } from '@/lib/formHelpers'
import { Plus, RotateCcw, Trash2 } from 'lucide-react'
import { getZipCode } from '@/lib/utils'
import { ZipCodeSelectionModal } from '../ZipCodeSelectionModal'

interface EmploymentInformationProps {
  section: 'buyer' | 'cobuyer'
}

export function EmploymentInformation({ section }: EmploymentInformationProps) {
  const { form } = useFormContext()
  const { config } = useCreditAppStore()

  // Modal state for zip code selection
  const [isZipModalOpen, setIsZipModalOpen] = useState(false)
  const [zipCodeItems, setZipCodeItems] = useState<any[]>([])
  const [currentZipCode, setCurrentZipCode] = useState('')
  const [currentType, setCurrentType] = useState('')

  const basePath = section === 'buyer' ? 'buyerInfo' : 'coBuyerInfo'
  const employmentPath = `${basePath}.employmentInfo`
  const previousEmploymentsPath = `${basePath}.previousEmployments`

  const previousEmployments = form.watch(previousEmploymentsPath as any) || []

  // Handle multiple zip code results
  const handleMultipleZipResults = (items: any[], zip: string, type: string) => {
    setZipCodeItems(items)
    setCurrentZipCode(zip)
    setCurrentType(type)
    setIsZipModalOpen(true)
  }

  // Handle zip code selection from modal
  const handleZipCodeSelection = (item: any) => {
    form.setValue(`${currentType}.employer_city`, item.city)
    form.setValue(`${currentType}.employer_state`, item.state)
  }

  const addPreviousEmployment = () => {
    // Only add if no previous employment exists (limit to one)
    const currentEmployments = form.getValues(previousEmploymentsPath as any) || []
    if (currentEmployments.length === 0) {
      form.setValue(previousEmploymentsPath as any, [
        {
          employer: '',
          title_employment: '',
          phone_employment: '',
          gross_monthly: '',
          time_company_years: '',
          time_company_months: '0',
          type_employment: '',
          employer_street: '',
          employer_zip: '',
          employer_city: '',
          employer_state: ''
        }
      ])
    }
  }

  const removePreviousEmployment = (index: number) => {
    form.setValue(previousEmploymentsPath as any, [])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Current Employment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Employment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor={`${employmentPath}.employer`}>Employer Name *</Label>
              <Input
                id={`${employmentPath}.employer`}
                {...form.register(`${employmentPath}.employer`)}
                placeholder="Enter employer name"
              />
              {getFieldError(form.formState.errors, `${employmentPath}.employer`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${employmentPath}.employer`)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor={`${employmentPath}.title_employment`}>Title/Position *</Label>
              <Input
                id={`${employmentPath}.title_employment`}
                {...form.register(`${employmentPath}.title_employment`)}
                placeholder="Enter job title"
              />
              {getFieldError(form.formState.errors, `${employmentPath}.title_employment`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${employmentPath}.title_employment`)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor={`${employmentPath}.phone_employment`}>Business Phone *</Label>
              <Input
                id={`${employmentPath}.phone_employment`}
                {...form.register(`${employmentPath}.phone_employment`)}
                placeholder="Business phone"
              />
              {getFieldError(form.formState.errors, `${employmentPath}.phone_employment`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${employmentPath}.phone_employment`)}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor={`${employmentPath}.gross_monthly`}>Gross Monthly Salary *</Label>
              <Input
                id={`${employmentPath}.gross_monthly`}
                {...form.register(`${employmentPath}.gross_monthly`)}
                placeholder="Monthly salary"
              />
              {getFieldError(form.formState.errors, `${employmentPath}.gross_monthly`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${employmentPath}.gross_monthly`)}
                </p>
              )}
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`${employmentPath}.time_company_years`}>Years *</Label>
                  <Input
                    id={`${employmentPath}.time_company_years`}
                    {...form.register(`${employmentPath}.time_company_years`)}
                    placeholder="Years"
                  />
                  {getFieldError(form.formState.errors, `${employmentPath}.time_company_years`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${employmentPath}.time_company_years`)}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`${employmentPath}.time_company_months`}>Months</Label>
                  <Input
                    id={`${employmentPath}.time_company_months`}
                    {...form.register(`${employmentPath}.time_company_months`)}
                    placeholder="Months"
                    defaultValue="0"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor={`${employmentPath}.type_employment`}>Employment Type *</Label>
              <Select
                value={form.watch(`${employmentPath}.type_employment`)}
                onValueChange={(value) => form.setValue(`${employmentPath}.type_employment`, value)}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {employmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getFieldError(form.formState.errors, `${employmentPath}.type_employment`) && (
                <p className="text-sm text-red-600 mt-1">
                  {getFieldError(form.formState.errors, `${employmentPath}.type_employment`)}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`${employmentPath}.aditional_income`}>Other Income</Label>
              <Input
                id={`${employmentPath}.aditional_income`}
                {...form.register(`${employmentPath}.aditional_income`)}
                placeholder="Other income amount"
              />
            </div>

            <div>
              <Label htmlFor={`${employmentPath}.source_addl`}>Other Income Source</Label>
              <Input
                id={`${employmentPath}.source_addl`}
                {...form.register(`${employmentPath}.source_addl`)}
                placeholder="Income source"
              />
            </div>
          </div>

          {/* Employer Address */}
          {config.employerAddress && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor={`${employmentPath}.employer_street`}>Employer Street *</Label>
                  <Input
                    id={`${employmentPath}.employer_street`}
                    {...form.register(`${employmentPath}.employer_street`)}
                    placeholder="Employer street address"
                  />
                  {getFieldError(form.formState.errors, `${employmentPath}.employer_street`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${employmentPath}.employer_street`)}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`${employmentPath}.employer_zip`}>Employer Zip *</Label>
                  <div className="relative">
                    <Input
                      id={`${employmentPath}.employer_zip`}
                      {...form.register(`${employmentPath}.employer_zip`)}
                      placeholder="Zip Code"
                      className="pr-10"
                      // onChange={() => {
                      //   const zip = form.watch(`${employmentPath}.employer_zip`);
                      //   if (zip && zip.length === 5) {
                      //     getZipCode(zip, employmentPath, form, handleMultipleZipResults)
                      //   }
                      // }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const zip = form.watch(`${employmentPath}.employer_zip`);
                        if (zip && zip.length === 5) {
                          getZipCode(zip, employmentPath, form, handleMultipleZipResults)
                        }
                      }}
                      className="absolute right-0 top-0 h-full px-3 bg-gray-100 hover:bg-gray-200 rounded-r-sm border border-l-0 border-gray-300 flex items-center justify-center transition-colors"
                    >
                      <RotateCcw className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  {getFieldError(form.formState.errors, `${employmentPath}.employer_zip`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${employmentPath}.employer_zip`)}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`${employmentPath}.employer_city`}>Employer City *</Label>
                  <Input
                    id={`${employmentPath}.employer_city`}
                    {...form.register(`${employmentPath}.employer_city`)}
                    placeholder="City"
                  />
                  {getFieldError(form.formState.errors, `${employmentPath}.employer_city`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${employmentPath}.employer_city`)}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`${employmentPath}.employer_state`}>Employer State *</Label>
                  <Input
                    id={`${employmentPath}.employer_state`}
                    {...form.register(`${employmentPath}.employer_state`)}
                    placeholder="State"
                  />
                  {getFieldError(form.formState.errors, `${employmentPath}.employer_state`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${employmentPath}.employer_state`)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Previous Employment */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">
              Previous Employment
            </CardTitle>
            {previousEmployments.length === 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPreviousEmployment}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {previousEmployments.map((employment: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`${previousEmploymentsPath}.${index}.employer`}>Employer Name *</Label>
                  <Input
                    {...form.register(`${previousEmploymentsPath}.${index}.employer`)}
                    placeholder="Enter employer name"
                  />
                  {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.employer`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.employer`)}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`${previousEmploymentsPath}.${index}.title_employment`}>Title/Position *</Label>
                  <Input
                    {...form.register(`${previousEmploymentsPath}.${index}.title_employment`)}
                    placeholder="Enter job title_employment"
                  />
                  {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.title_employment`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.title_employment`)}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`${previousEmploymentsPath}.${index}.phone_employment`}>Business Phone *</Label>
                  <Input
                    {...form.register(`${previousEmploymentsPath}.${index}.phone_employment`)}
                    placeholder="Business phone"
                  />
                  {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.phone_employment`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.phone_employment`)}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`${previousEmploymentsPath}.${index}.gross_monthly`}>Gross Monthly Salary *</Label>
                  <Input
                    {...form.register(`${previousEmploymentsPath}.${index}.gross_monthly`)}
                    placeholder="Monthly salary"
                  />
                  {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.gross_monthly`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.gross_monthly`)}
                    </p>
                  )}
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`${previousEmploymentsPath}.${index}.time_company_years`}>Years *</Label>
                      <Input
                        {...form.register(`${previousEmploymentsPath}.${index}.time_company_years`)}
                        placeholder="Years"
                      />
                      {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.time_company_years`) && (
                        <p className="text-sm text-red-600 mt-1">
                          {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.time_company_years`)}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`${previousEmploymentsPath}.${index}.time_company_months`}>Months</Label>
                      <Input
                        {...form.register(`${previousEmploymentsPath}.${index}.time_company_months`)}
                        placeholder="Months"
                        defaultValue="0"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor={`${previousEmploymentsPath}.${index}.type_employment`}>Employment Type *</Label>
                  <Select
                    value={form.watch(`${previousEmploymentsPath}.${index}.type_employment`)}
                    onValueChange={(value) => form.setValue(`${previousEmploymentsPath}.${index}.type_employment`, value)}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {employmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.type_employment`) && (
                    <p className="text-sm text-red-600 mt-1">
                      {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.type_employment`)}
                    </p>
                  )}
                </div>
              </div>

              {/* Previous Employment Address */}
              {/* {config.employerAddress && ( */}
              {true && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor={`${previousEmploymentsPath}.${index}.employer_street`}>Employer Street *</Label>
                      <Input
                        {...form.register(`${previousEmploymentsPath}.${index}.employer_street`)}
                        placeholder="Employer street address"
                      />
                      {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.employer_street`) && (
                        <p className="text-sm text-red-600 mt-1">
                          {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.employer_street`)}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`${previousEmploymentsPath}.${index}.employer_zip`}>Employer Zip *</Label>
                      <div className="relative">
                        <Input
                          {...form.register(`${previousEmploymentsPath}.${index}.employer_zip`)}
                          placeholder="Zip code"
                          className="pr-10"
                          // onChange={() => {
                          //   const zip = form.watch(`${previousEmploymentsPath}.${index}.employer_zip`);
                          //   if (zip && zip.length === 5) {
                          //     getZipCode(zip, `${previousEmploymentsPath}.${index}`, form, handleMultipleZipResults)
                          //   }
                          // }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const zip = form.watch(`${previousEmploymentsPath}.${index}.employer_zip`);
                            if (zip && zip.length === 5) {
                              getZipCode(zip, `${previousEmploymentsPath}.${index}`, form, handleMultipleZipResults)
                            }
                          }}
                          className="absolute right-0 top-0 h-full px-3 bg-gray-100 hover:bg-gray-200 rounded-r-sm border border-l-0 border-gray-300 flex items-center justify-center transition-colors"
                        >
                          <RotateCcw className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.employer_zip`) && (
                        <p className="text-sm text-red-600 mt-1">
                          {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.employer_zip`)}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`${previousEmploymentsPath}.${index}.employer_city`}>Employer City *</Label>
                      <Input
                        {...form.register(`${previousEmploymentsPath}.${index}.employer_city`)}
                        placeholder="City"
                      />
                      {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.employer_city`) && (
                        <p className="text-sm text-red-600 mt-1">
                          {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.employer_city`)}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`${previousEmploymentsPath}.${index}.employer_state`}>Employer State *</Label>
                      <Input
                        {...form.register(`${previousEmploymentsPath}.${index}.employer_state`)}
                        placeholder="State"
                      />
                      {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.employer_state`) && (
                        <p className="text-sm text-red-600 mt-1">
                          {getFieldError(form.formState.errors, `${previousEmploymentsPath}.${index}.employer_state`)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removePreviousEmployment(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

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
