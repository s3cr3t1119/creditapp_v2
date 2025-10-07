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
  apt_unit: string
  zip: string
  city: string
  state: string
  email: string
  homePhone: string
  cellPhone: string
  dob: string
  ssn: string
  dlr_nro: string
  dlr_state: string
  dlr_expiration: string
}

export interface ResidentialInfo {
  res_years: string
  res_months: string
  res_monthly_payment: string
  residence: string
}

export interface PreviousResidence {
  address: string
  apt_unit: string
  zip: string
  city: string
  state: string
  res_years: string
  res_months: string
  res_monthly_payment: string
  residence: string
}

export interface EmploymentInfo {
  employer: string
  title_employment: string
  phone_employment: string
  gross_monthly: string
  time_company_years: string
  time_company_months: string
  type_employment: string
  aditional_income: string
  source_addl: string
  employer_street: string
  employer_zip: string
  employer_city: string
  employer_state: string
}

export interface PreviousEmployment {
  employer: string
  title_employment: string
  phone_employment: string
  gross_monthly: string
  time_company_years: string
  time_company_months: string
  type_employment: string
  employer_street: string
  employer_zip: string
  employer_city: string
  employer_state: string
}

export interface CoBuyerInfo {
  relationship: string
  clientInfo: ClientInfo
  residentialInfo: ResidentialInfo
  previousResidences: PreviousResidence[]
  employmentInfo: EmploymentInfo
  previousEmployments: PreviousEmployment[]
}

export interface InventoryInfo {
  id: string
  make: string
  model: string
  vin: string
  year: number
}

export interface AgentInfo {
  id: string
  fullName: string
}

// API Response types
export interface ApiResponse<T = any> {
  items?: T
  msg: string
  error: number
}

export interface FetchedFormData {
  adfEmail: string | null
  adfEmails: Array<string> | string | null
  contactEmail: string | null
  financing: Partial<{
    agents: Array<AgentInfo> | null
  }>
  inventory?: Array<InventoryInfo> | null
  name: string | null
  phone: string | null
  token: string | null
}

export interface ZipCodeInfo {
  city: string
  county: string
  state: string | null | undefined
}

export interface CreditAppInfo {
  vehicleInfo: VehicleInfo
  buyerInfo: {
    clientInfo: ClientInfo
    residentialInfo: ResidentialInfo
    previousResidences: PreviousResidence[]
    employmentInfo: EmploymentInfo
    previousEmployments: PreviousEmployment[]
  }
  has_cobuyer: boolean
  coBuyerInfo: CoBuyerInfo
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
  has_cobuyer: boolean
  coBuyerInfo: CoBuyerInfo
  
  // UI state
  activeTab: 'buyer' | 'cobuyer'
  isLoading: boolean
  errors: Record<string, string[]>
  
  // Data fetching state
  isDataLoading: boolean
  showSuccessPage: boolean
  dataError: string | null
  fetchedData: FetchedFormData | null
  
  // Configuration
  config: {
    id: string
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
  setLoading: (loading: boolean) => void
  setErrors: (errors: Record<string, string[]>) => void
  clearErrors: () => void
  setConfig: (config: Partial<CreditAppState['config']>) => void
  
  // Data fetching actions
  setDataLoading: (loading: boolean) => void
  setShowSuccessPage: (show: boolean) => void
  setDataError: (error: string | null) => void
  setFetchedData: (data: FetchedFormData | null) => void
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
      apt_unit: '',
      zip: '',
      city: '',
      state: '',
      email: '',
      homePhone: '',
      cellPhone: '',
      dob: '',
      ssn: '',
      dlr_nro: '',
      dlr_state: '',
      dlr_expiration: ''
    },
    residentialInfo: {
      res_years: '',
      res_months: '0',
      res_monthly_payment: '',
      residence: ''
    },
    previousResidences: [],
    employmentInfo: {
      employer: '',
      title_employment: '',
      phone_employment: '',
      gross_monthly: '',
      time_company_years: '',
      time_company_months: '0',
      type_employment: '',
      aditional_income: '',
      source_addl: '',
      employer_street: '',
      employer_zip: '',
      employer_city: '',
      employer_state: ''
    },
    previousEmployments: []
  },
  has_cobuyer: false,
  coBuyerInfo: {
    relationship: '',
    clientInfo: {
      firstName: '',
      lastName: '',
      address: '',
      apt_unit: '',
      zip: '',
      city: '',
      state: '',
      email: '',
      homePhone: '',
      cellPhone: '',
      dob: '',
      ssn: '',
      dlr_nro: '',
      dlr_state: '',
      dlr_expiration: ''
    },
    residentialInfo: {
      res_years: '',
      res_months: '0',
      res_monthly_payment: '',
      residence: ''
    },
    previousResidences: [],
    employmentInfo: {
      employer: '',
      title_employment: '',
      phone_employment: '',
      gross_monthly: '',
      time_company_years: '',
      time_company_months: '0',
      type_employment: '',
      aditional_income: '',
      source_addl: '',
      employer_street: '',
      employer_zip: '',
      employer_city: '',
      employer_state: ''
    },
    previousEmployments: []
  },
  activeTab: 'buyer' as const,
  isLoading: false,
  errors: {},
  
  // Data fetching state
  isDataLoading: false,
  showSuccessPage: false,
  dataError: null,
  fetchedData: null,
  
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
    (set) => ({
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

      setLoading: (loading) => set({ isLoading: loading }),
      
      setErrors: (errors) => set({ errors }),
      
      clearErrors: () => set({ errors: {} }),
      
      setConfig: (config) =>
        set((state) => ({
          config: { ...state.config, ...config }
        })),

      // Data fetching actions
      setDataLoading: (loading) => set({ isDataLoading: loading }),
      
      setShowSuccessPage: (show) => set({ showSuccessPage: show }),
      
      setDataError: (error) => set({ dataError: error }),
      
      setFetchedData: (data) => set({ fetchedData: data })
    }),
    {
      name: 'credit-app-store'
    }
  )
)
