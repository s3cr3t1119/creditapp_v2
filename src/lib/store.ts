import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface VehicleInfo {
  vehicle_title: string
  sales_agent: string
  down_payment: string
  trade_year: string
  trade_make: string
  trade_model: string
}

export interface ClientInfo {
  firstName: string
  lastName: string
  address: string
  aptUnit: string
  zipCode: string
  city: string
  state: string
  email: string
  homePhone: string
  cellPhone: string
  dateOfBirth: string
  ssn: string
  driverLicenseNo: string
  driverLicenseState: string
  driverLicenseExpiration: string
}

export interface ResidentialInfo {
  years: string
  months: string
  monthlyPayment: string
  residenceType: string
}

export interface PreviousResidence {
  address: string
  aptUnit: string
  zipCode: string
  city: string
  state: string
  years: string
  months: string
  monthlyPayment: string
  residenceType: string
}

export interface EmploymentInfo {
  employerName: string
  title: string
  businessPhone: string
  grossMonthlySalary: string
  years: string
  months: string
  employmentType: string
  otherIncome: string
  otherIncomeSource: string
  employerStreet: string
  employerZip: string
  employerCity: string
  employerState: string
}

export interface PreviousEmployment {
  employerName: string
  title: string
  businessPhone: string
  grossMonthlySalary: string
  years: string
  months: string
  employmentType: string
  employerStreet: string
  employerZip: string
  employerCity: string
  employerState: string
}

export interface CoBuyerInfo {
  hasCoBuyer: boolean
  relationshipType: string
  clientInfo: ClientInfo
  residentialInfo: ResidentialInfo
  previousResidences: PreviousResidence[]
  employmentInfo: EmploymentInfo
  previousEmployments: PreviousEmployment[]
}

export interface CreditAppState {
  // Form data
  vehicleInfo: VehicleInfo
  buyerInfo: {
    clientInfo: ClientInfo
    residentialInfo: ResidentialInfo
    previousResidences: PreviousResidence[]
    employmentInfo: EmploymentInfo
    previousEmployments: PreviousEmployment[]
  }
  coBuyerInfo: CoBuyerInfo
  
  // UI state
  activeTab: 'buyer' | 'cobuyer'
  isLoading: boolean
  errors: Record<string, string[]>
  
  // Configuration
  config: {
    primaryColor: string
    showAgents: boolean
    twoYearEmployment: boolean
    employerAddress: boolean
    twoYearResidence: boolean
    driverLicense: boolean
    previousResidency: boolean
    previousResidencyRequiredYear: number
    successPageEnabled: boolean
    dealerLocation: string
    btnType: string
    borderRadius: string
    borderWidth: string
    borderColor: string
    color: string
    backgroundColor: string
    hColor: string
    hBorderC: string
    bgHColor: string
    opacity: string
    thickness: string
  }
  
  // Actions
  setActiveTab: (tab: 'buyer' | 'cobuyer') => void
  updateVehicleInfo: (data: Partial<VehicleInfo>) => void
  updateBuyerInfo: (data: Partial<CreditAppState['buyerInfo']>) => void
  updateCoBuyerInfo: (data: Partial<CoBuyerInfo>) => void
  addPreviousResidence: (residence: PreviousResidence) => void
  removePreviousResidence: (index: number) => void
  addPreviousEmployment: (employment: PreviousEmployment) => void
  removePreviousEmployment: (index: number) => void
  setLoading: (loading: boolean) => void
  setErrors: (errors: Record<string, string[]>) => void
  clearErrors: () => void
  setConfig: (config: Partial<CreditAppState['config']>) => void
  resetForm: () => void
}

const initialState = {
  vehicleInfo: {
    vehicle_title: 'Any Car',
    sales_agent: 'none',
    down_payment: '',
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
  },
  activeTab: 'buyer' as const,
  isLoading: false,
  errors: {},
  config: {
    primaryColor: '#d8534e',
    showAgents: true,
    twoYearEmployment: false,
    employerAddress: true,
    twoYearResidence: false,
    driverLicense: false,
    previousResidency: true,
    previousResidencyRequiredYear: 2,
    successPageEnabled: false,
    dealerLocation: '',
    btnType: 'standard',
    borderRadius: '4px',
    borderWidth: '2px',
    borderColor: '#000000',
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,1)',
    hColor: '#ffffff',
    hBorderC: '#000000',
    bgHColor: '#000000',
    opacity: '1',
    thickness: '2'
  }
}

export const useCreditAppStore = create<CreditAppState>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      updateVehicleInfo: (data) =>
        set((state) => ({
          vehicleInfo: { ...state.vehicleInfo, ...data }
        })),
      
      updateBuyerInfo: (data) =>
        set((state) => ({
          buyerInfo: { ...state.buyerInfo, ...data }
        })),
      
      updateCoBuyerInfo: (data) =>
        set((state) => ({
          coBuyerInfo: { ...state.coBuyerInfo, ...data }
        })),
      
      addPreviousResidence: (residence) =>
        set((state) => {
          const isCoBuyer = state.activeTab === 'cobuyer'
          const currentResidences = isCoBuyer 
            ? state.coBuyerInfo.previousResidences 
            : state.buyerInfo.previousResidences
          
          if (isCoBuyer) {
            return {
              coBuyerInfo: {
                ...state.coBuyerInfo,
                previousResidences: [...currentResidences, residence]
              }
            }
          } else {
            return {
              buyerInfo: {
                ...state.buyerInfo,
                previousResidences: [...currentResidences, residence]
              }
            }
          }
        }),
      
      removePreviousResidence: (index) =>
        set((state) => {
          const isCoBuyer = state.activeTab === 'cobuyer'
          const currentResidences = isCoBuyer 
            ? state.coBuyerInfo.previousResidences 
            : state.buyerInfo.previousResidences
          
          const newResidences = currentResidences.filter((_, i) => i !== index)
          
          if (isCoBuyer) {
            return {
              coBuyerInfo: {
                ...state.coBuyerInfo,
                previousResidences: newResidences
              }
            }
          } else {
            return {
              buyerInfo: {
                ...state.buyerInfo,
                previousResidences: newResidences
              }
            }
          }
        }),
      
      addPreviousEmployment: (employment) =>
        set((state) => {
          const isCoBuyer = state.activeTab === 'cobuyer'
          const currentEmployments = isCoBuyer 
            ? state.coBuyerInfo.previousEmployments 
            : state.buyerInfo.previousEmployments
          
          if (isCoBuyer) {
            return {
              coBuyerInfo: {
                ...state.coBuyerInfo,
                previousEmployments: [...currentEmployments, employment]
              }
            }
          } else {
            return {
              buyerInfo: {
                ...state.buyerInfo,
                previousEmployments: [...currentEmployments, employment]
              }
            }
          }
        }),
      
      removePreviousEmployment: (index) =>
        set((state) => {
          const isCoBuyer = state.activeTab === 'cobuyer'
          const currentEmployments = isCoBuyer 
            ? state.coBuyerInfo.previousEmployments 
            : state.buyerInfo.previousEmployments
          
          const newEmployments = currentEmployments.filter((_, i) => i !== index)
          
          if (isCoBuyer) {
            return {
              coBuyerInfo: {
                ...state.coBuyerInfo,
                previousEmployments: newEmployments
              }
            }
          } else {
            return {
              buyerInfo: {
                ...state.buyerInfo,
                previousEmployments: newEmployments
              }
            }
          }
        }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setErrors: (errors) => set({ errors }),
      
      clearErrors: () => set({ errors: {} }),
      
      setConfig: (config) =>
        set((state) => ({
          config: { ...state.config, ...config }
        })),
      
      resetForm: () => set(initialState)
    }),
    {
      name: 'credit-app-store'
    }
  )
)
