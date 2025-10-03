'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCreditAppStore } from '@/lib/store'
import { creditApplicationSchema, createDynamicCreditApplicationSchema, type CreditApplication } from '@/lib/schemas'
import { VehicleInformation } from './sections/VehicleInformation'
import { ClientInformation } from './sections/ClientInformation'
import { ResidentialInformation } from './sections/ResidentialInformation'
import { EmploymentInformation } from './sections/EmploymentInformation'
import { CoBuyerInformation } from './sections/CoBuyerInformation'
import { FormProvider } from './FormProvider'

export function CreditApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { activeTab, setActiveTab, config } = useCreditAppStore()

  // Create dynamic schema based on current configuration
  const dynamicSchema = createDynamicCreditApplicationSchema(config)

  const form = useForm<any>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: {
      vehicleInfo: {
        vehicle_title: 'Any Car',
        sales_agent: 'none',
        down_payment: '0',
        trade_year: '',
        trade_make: '',
        trade_model: ''
      },
      buyerInfo: {
        clientInfo: {
          firstName: '',
          lastName: '',
          address: '',
          aptUnit: '',
          zipCode: '',
          city: '',
          state: '',
          email: '',
          homePhone: '',
          cellPhone: '',
          dateOfBirth: '',
          ssn: '',
          driverLicenseNo: '',
          driverLicenseState: '',
          driverLicenseExpiration: ''
        },
        residentialInfo: {
          years: '',
          months: '0',
          monthlyPayment: '',
          residenceType: ''
        },
        previousResidences: [],
        employmentInfo: {
          employerName: '',
          title: '',
          businessPhone: '',
          grossMonthlySalary: '',
          years: '',
          months: '0',
          employmentType: '',
          otherIncome: '',
          otherIncomeSource: '',
          employerStreet: '',
          employerZip: '',
          employerCity: '',
          employerState: ''
        },
        previousEmployments: []
      },
      coBuyerInfo: {
        hasCoBuyer: false,
        relationshipType: '',
        clientInfo: {
          firstName: '',
          lastName: '',
          address: '',
          aptUnit: '',
          zipCode: '',
          city: '',
          state: '',
          email: '',
          homePhone: '',
          cellPhone: '',
          dateOfBirth: '',
          ssn: '',
          driverLicenseNo: '',
          driverLicenseState: '',
          driverLicenseExpiration: ''
        },
        residentialInfo: {
          years: '',
          months: '0',
          monthlyPayment: '',
          residenceType: ''
        },
        previousResidences: [],
        employmentInfo: {
          employerName: '',
          title: '',
          businessPhone: '',
          grossMonthlySalary: '',
          years: '',
          months: '0',
          employmentType: '',
          otherIncome: '',
          otherIncomeSource: '',
          employerStreet: '',
          employerZip: '',
          employerCity: '',
          employerState: ''
        },
        previousEmployments: []
      }
    }
  })
  console.log(form);

  // Update resolver when config changes
  useEffect(() => {
    const newSchema = createDynamicCreditApplicationSchema(config)
    form.clearErrors() // Clear any validation errors when schema changes
  }, [config, form])

  const onSubmit = async (data: any) => {
    console.log(data)
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        // Redirect to success page if enabled
        if (config.successPageEnabled) {
          window.location.href = `${window.location.pathname}?success=true`
        } else {
          alert('Application submitted successfully!')
        }
      } else {
        throw new Error(result.message || 'Submission failed')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('There was an error submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormProvider form={form}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="p-8 shadow-sm">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'buyer' | 'cobuyer')}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="buyer">Buyer</TabsTrigger>
                <TabsTrigger value="cobuyer">Co-buyer</TabsTrigger>
              </TabsList>

              <TabsContent value="buyer" className="space-y-8">
                <motion.div
                  key="buyer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <VehicleInformation />
                  <ClientInformation section="buyer" />
                  <ResidentialInformation section="buyer" />
                  <EmploymentInformation section="buyer" />
                </motion.div>
              </TabsContent>

              <TabsContent value="cobuyer" className="space-y-8">
                <motion.div
                  key="cobuyer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CoBuyerInformation />
                </motion.div>
              </TabsContent>
            </Tabs>

            <div className="border-t pt-8">
              <div className="mb-6">
                <label className="flex items-start space-x-3">
                  <span className="text-sm text-gray-900">
                    By clicking "Accept & Submit", I, the undersigned, (a) for the purpose of securing credit, 
                    certify the below representations to be correct; (b) authorize financial institutions, as they 
                    consider necessary and appropriate, to obtain consumer credit reports on me periodically and 
                    to gather employment history, and (c) understand that we, or any financial institution to whom 
                    this application is submitted, will retain this application whether or not it is approved, and 
                    that it is the applicant's responsibility to notify the creditor of any change of name, address, 
                    or employment. We and any financial institution to whom this application is submitted, may share 
                    certain non-public personal information about you with your authorization or as provided by law.
                  </span>
                </label>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className='flex space-x-3 gap-2 items-center'>
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className='text-gray-900'>I accept the above terms.</span>
                </label>
                <div className="flex lg:justify-end justify-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 text-lg"
                    style={{
                      backgroundColor: config.primaryColor,
                      borderRadius: config.borderRadius,
                      borderWidth: config.borderWidth,
                      // borderColor: config.borderColor,
                      color: config.color
                    }}
                  >{isSubmitting ? 'Please wait...' : 'Submit'}
                  </Button>
                </div>
              </div>
              <div className='w-full text-center'>
                <span className='text-md'>Version 1.1.8</span>
              </div>
            </div>
          </form>
        </Card>
      </motion.div>
    </FormProvider>
  )
}
