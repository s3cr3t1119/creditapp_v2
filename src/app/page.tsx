'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useCreditAppStore } from '@/lib/store'
import { configSchema } from '@/lib/schemas'
import { CreditApplicationForm } from '@/components/CreditApplicationForm'
import { SuccessPage } from '@/components/SuccessPage'
import { useDataFetching } from '@/hooks/useDataFetching'
import { NotFound } from '@/components/NotFound'

export default function Home() {
  const searchParams = useSearchParams()
  const { config, setConfig, showSuccessPage } = useCreditAppStore()
  const { fetchAndPopulate, isDataLoading, dataError } = useDataFetching()

  useEffect(() => {
    // Parse URL parameters and set configuration
    const urlConfig = {
      id: searchParams.get('id') || '',
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

  // Fetch data when component mounts if ID is provided
  useEffect(() => {
    const id = searchParams.get('id') || ''
    const fetchParams = {
      id,
      deployType: searchParams.get('deployType') || undefined,
      parentDomain: searchParams.get('parentDomain') || undefined,
      parentIP: searchParams.get('parentIP') || undefined,
    }
    
    fetchAndPopulate(fetchParams)
  }, [searchParams, fetchAndPopulate])

  // Check if we should show success page
  const showSuccess = config.successPageEnabled && showSuccessPage

  if (showSuccess) {
    return <SuccessPage />
  }

  // Show loading state while fetching data
  if (isDataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application data...</p>
        </div>
      </div>
    )
  }

  // Show error state if data fetching failed
  if (dataError) {
    return <NotFound />
  }

  return (
    <div className="min-h-screen bg-gray-50">
            <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: 'head',
          nonce: undefined,
        }}
      >
        <CreditApplicationForm />
      </GoogleReCaptchaProvider>
    </div>
  )
}