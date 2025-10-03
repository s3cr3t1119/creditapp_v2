'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useFormContext } from '@/components/FormProvider'
import { useCreditAppStore } from '@/lib/store'
import { employmentTypes } from '@/lib/schemas'
import { Plus, RotateCcw, Trash2 } from 'lucide-react'

interface EmploymentInformationProps {
  section: 'buyer' | 'cobuyer'
}

export function EmploymentInformation({ section }: EmploymentInformationProps) {
  const { form } = useFormContext()
  const { config } = useCreditAppStore()

  const basePath = section === 'buyer' ? 'buyerInfo' : 'coBuyerInfo'
  const employmentPath = `${basePath}.employmentInfo`
  const previousEmploymentsPath = `${basePath}.previousEmployments`

  const previousEmployments = form.watch(previousEmploymentsPath as any) || []

  const addPreviousEmployment = () => {
    // Only add if no previous employment exists (limit to one)
    const currentEmployments = form.getValues(previousEmploymentsPath as any) || []
    if (currentEmployments.length === 0) {
      form.setValue(previousEmploymentsPath as any, [
        {
          employerName: '',
          title: '',
          businessPhone: '',
          grossMonthlySalary: '',
          years: '',
          months: '0',
          employmentType: '',
          employerStreet: '',
          employerZip: '',
          employerCity: '',
          employerState: ''
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
              <Label htmlFor={`${employmentPath}.employerName`}>Employer Name *</Label>
              <Input
                id={`${employmentPath}.employerName`}
                {...form.register(`${employmentPath}.employerName`)}
                placeholder="Enter employer name"
              />
              {form.formState.errors.buyerInfo?.employmentInfo?.employerName && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.buyerInfo.employmentInfo.employerName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor={`${employmentPath}.title`}>Title/Position *</Label>
              <Input
                id={`${employmentPath}.title`}
                {...form.register(`${employmentPath}.title`)}
                placeholder="Enter job title"
              />
              {form.formState.errors.buyerInfo?.employmentInfo?.title && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.buyerInfo.employmentInfo.title.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor={`${employmentPath}.businessPhone`}>Business Phone *</Label>
              <Input
                id={`${employmentPath}.businessPhone`}
                {...form.register(`${employmentPath}.businessPhone`)}
                placeholder="Business phone"
              />
              {form.formState.errors.buyerInfo?.employmentInfo?.businessPhone && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.buyerInfo.employmentInfo.businessPhone.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor={`${employmentPath}.grossMonthlySalary`}>Gross Monthly Salary *</Label>
              <Input
                id={`${employmentPath}.grossMonthlySalary`}
                {...form.register(`${employmentPath}.grossMonthlySalary`)}
                placeholder="Monthly salary"
              />
              {form.formState.errors.buyerInfo?.employmentInfo?.grossMonthlySalary && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.buyerInfo.employmentInfo.grossMonthlySalary.message}
                </p>
              )}
            </div>

            <div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor={`${employmentPath}.years`}>Years *</Label>
                  <Input
                    id={`${employmentPath}.years`}
                    {...form.register(`${employmentPath}.years`)}
                    placeholder="Years"
                  />
                  {form.formState.errors.buyerInfo?.employmentInfo?.years && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.buyerInfo.employmentInfo.years.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`${employmentPath}.months`}>Months</Label>
                  <Input
                    id={`${employmentPath}.months`}
                    {...form.register(`${employmentPath}.months`)}
                    placeholder="Months"
                    defaultValue="0"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor={`${employmentPath}.employmentType`}>Employment Type *</Label>
              <Select
                value={form.watch(`${employmentPath}.employmentType`)}
                onValueChange={(value) => form.setValue(`${employmentPath}.employmentType`, value)}
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
              {form.formState.errors.buyerInfo?.employmentInfo?.employmentType && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.buyerInfo.employmentInfo.employmentType.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`${employmentPath}.otherIncome`}>Other Income</Label>
              <Input
                id={`${employmentPath}.otherIncome`}
                {...form.register(`${employmentPath}.otherIncome`)}
                placeholder="Other income amount"
              />
            </div>

            <div>
              <Label htmlFor={`${employmentPath}.otherIncomeSource`}>Other Income Source</Label>
              <Input
                id={`${employmentPath}.otherIncomeSource`}
                {...form.register(`${employmentPath}.otherIncomeSource`)}
                placeholder="Income source"
              />
            </div>
          </div>

          {/* Employer Address */}
          {/* {config.employerAddress && ( */}
          {true && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor={`${employmentPath}.employerStreet`}>Employer Street *</Label>
                  <Input
                    id={`${employmentPath}.employerStreet`}
                    {...form.register(`${employmentPath}.employerStreet`)}
                    placeholder="Employer street address"
                  />
                  {form.formState.errors.buyerInfo?.employmentInfo?.employerStreet && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.buyerInfo.employmentInfo.employerStreet.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`${employmentPath}.employerZip`}>Employer Zip *</Label>
                  <div className="relative">
                    <Input
                      id={`${employmentPath}.employerZip`}
                      {...form.register(`${employmentPath}.employerZip`)}
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
                  {form.formState.errors.buyerInfo?.employmentInfo?.employerZip && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.buyerInfo.employmentInfo.employerZip.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`${employmentPath}.employerCity`}>Employer City *</Label>
                  <Input
                    id={`${employmentPath}.employerCity`}
                    {...form.register(`${employmentPath}.employerCity`)}
                    placeholder="City"
                  />
                  {form.formState.errors.buyerInfo?.employmentInfo?.employerCity && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.buyerInfo.employmentInfo.employerCity.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`${employmentPath}.employerState`}>Employer State *</Label>
                  <Input
                    id={`${employmentPath}.employerState`}
                    {...form.register(`${employmentPath}.employerState`)}
                    placeholder="State"
                  />
                  {form.formState.errors.buyerInfo?.employmentInfo?.employerState && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.buyerInfo.employmentInfo.employerState.message}
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
                  <Label htmlFor={`${previousEmploymentsPath}.${index}.employerName`}>Employer Name *</Label>
                  <Input
                    {...form.register(`${previousEmploymentsPath}.${index}.employerName`)}
                    placeholder="Enter employer name"
                  />
                </div>

                <div>
                  <Label htmlFor={`${previousEmploymentsPath}.${index}.title`}>Title/Position *</Label>
                  <Input
                    {...form.register(`${previousEmploymentsPath}.${index}.title`)}
                    placeholder="Enter job title"
                  />
                </div>
                <div>
                  <Label htmlFor={`${previousEmploymentsPath}.${index}.businessPhone`}>Business Phone *</Label>
                  <Input
                    {...form.register(`${previousEmploymentsPath}.${index}.businessPhone`)}
                    placeholder="Business phone"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`${previousEmploymentsPath}.${index}.grossMonthlySalary`}>Gross Monthly Salary *</Label>
                  <Input
                    {...form.register(`${previousEmploymentsPath}.${index}.grossMonthlySalary`)}
                    placeholder="Monthly salary"
                  />
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`${previousEmploymentsPath}.${index}.years`}>Years *</Label>
                      <Input
                        {...form.register(`${previousEmploymentsPath}.${index}.years`)}
                        placeholder="Years"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${previousEmploymentsPath}.${index}.months`}>Months</Label>
                      <Input
                        {...form.register(`${previousEmploymentsPath}.${index}.months`)}
                        placeholder="Months"
                        defaultValue="0"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor={`${previousEmploymentsPath}.${index}.employmentType`}>Employment Type *</Label>
                  <Select
                    value={form.watch(`${previousEmploymentsPath}.${index}.employmentType`)}
                    onValueChange={(value) => form.setValue(`${previousEmploymentsPath}.${index}.employmentType`, value)}
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
                </div>
              </div>

              {/* Previous Employment Address */}
              {/* {config.employerAddress && ( */}
              {true && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor={`${previousEmploymentsPath}.${index}.employerStreet`}>Employer Street *</Label>
                      <Input
                        {...form.register(`${previousEmploymentsPath}.${index}.employerStreet`)}
                        placeholder="Employer street address"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`${previousEmploymentsPath}.${index}.employerZip`}>Employer Zip *</Label>
                      <div className="relative">
                        <Input
                          {...form.register(`${previousEmploymentsPath}.${index}.employerZip`)}
                          placeholder="Zip code"
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
                    </div>
                    <div>
                      <Label htmlFor={`${previousEmploymentsPath}.${index}.employerCity`}>Employer City *</Label>
                      <Input
                        {...form.register(`${previousEmploymentsPath}.${index}.employerCity`)}
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`${previousEmploymentsPath}.${index}.employerState`}>Employer State *</Label>
                      <Input
                        {...form.register(`${previousEmploymentsPath}.${index}.employerState`)}
                        placeholder="State"
                      />
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
    </motion.div>
  )
}
