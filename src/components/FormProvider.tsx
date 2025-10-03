'use client'

import { createContext, useContext, ReactNode } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CreditApplication } from '@/lib/schemas'

interface FormContextType {
  form: UseFormReturn<any>
}

const FormContext = createContext<FormContextType | undefined>(undefined)

interface FormProviderProps {
  form: UseFormReturn<any>
  children: ReactNode
}

export function FormProvider({ form, children }: FormProviderProps) {
  return (
    <FormContext.Provider value={{ form }}>
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}
