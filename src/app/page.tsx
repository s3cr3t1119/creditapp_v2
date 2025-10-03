'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCreditAppStore } from '@/lib/store'
import { configSchema } from '@/lib/schemas'
import { CreditApplicationForm } from '@/components/CreditApplicationForm'
import { SuccessPage } from '@/components/SuccessPage'

export default function Home() {
  const searchParams = useSearchParams()
  const { config, setConfig, isLoading } = useCreditAppStore()

  useEffect(() => {
    // Parse URL parameters and set configuration
    const urlConfig = {
      primaryColor: searchParams.get('primaryColor') || '#d8534e',
      showAgents: searchParams.get('showAgents') === 'true',
      twoYearEmployment: searchParams.get('two_year_employment') === 'true',
      employerAddress: searchParams.get('employer_address') === 'true',
      twoYearResidence: searchParams.get('two_year_residence') === 'true',
      driverLicense: searchParams.get('driver_license') === 'true',
      previousResidency: searchParams.get('previous_residency') === 'true',
      previousResidencyRequiredYear: parseInt(searchParams.get('previous_residency_required_year') || '2'),
      successPageEnabled: searchParams.get('successPageEnabled') === 'true',
      dealerLocation: searchParams.get('dealerLoc') || '',
      btnType: searchParams.get('btnType') || 'standard',
      borderRadius: searchParams.get('borderRadius') || '4px',
      borderWidth: searchParams.get('borderWidth') || '2px',
      borderColor: searchParams.get('borderColor') || '#000000',
      color: searchParams.get('color') || '#ffffff',
      backgroundColor: searchParams.get('bgColor') || 'rgba(0,0,0,1)',
      hColor: searchParams.get('hColor') || '#ffffff',
      hBorderC: searchParams.get('hBorderC') || '#000000',
      bgHColor: searchParams.get('bgHColor') || '#000000',
      opacity: searchParams.get('opacity') || '1',
      thickness: searchParams.get('thickness') || '2'
    }

    // Validate and set configuration
    try {
      const validatedConfig = configSchema.parse(urlConfig)
      setConfig(validatedConfig)
    } catch (error) {
      console.error('Invalid configuration:', error)
    }
  }, [searchParams, setConfig])

  // Check if we should show success page
  const showSuccess = searchParams.get('success') === 'true' && config.successPageEnabled

  if (showSuccess) {
    return <SuccessPage />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <CreditApplicationForm />
      </div>
    </div>
  )
}