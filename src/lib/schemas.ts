import { z } from 'zod'

// Common validation patterns
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const zipCodeRegex = /^\d{5}(-\d{4})?$/

// Base schemas for reusable components
export const addressSchema = z.object({
  address: z.string().min(1, 'Street address is required'),
  aptUnit: z.string().optional(),
  zipCode: z.string().min(1, 'Zip code is required').regex(zipCodeRegex, 'Invalid zip code format'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required')
})

export const contactInfoSchema = z.object({
  email: z.string().min(1, 'Email is required').regex(emailRegex, 'Invalid email format'),
  homePhone: z.string().min(1, 'Home phone is required').regex(phoneRegex, 'Invalid phone number'),
  cellPhone: z.string().min(1, 'Cell phone is required').regex(phoneRegex, 'Invalid phone number')
})

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  ssn: z.string().min(1, 'SSN is required').regex(ssnRegex, 'Invalid SSN format')
})

export const driverLicenseSchema = z.object({
  driverLicenseNo: z.string().optional(),
  driverLicenseState: z.string().optional(),
  driverLicenseExpiration: z.string().optional()
})

// Vehicle Information Schema
export const vehicleInfoSchema = z.object({
  vehicle_title: z.string().min(1, 'Vehicle selection is required'),
  sales_agent: z.string().optional(),
  down_payment: z.string().min(1, 'Down payment is required'),
  trade_year: z.string().optional(),
  trade_make: z.string().optional(),
  trade_model: z.string().optional()
})

// Client Information Schema
export const clientInfoSchema = z.object({
  ...personalInfoSchema.shape,
  ...addressSchema.shape,
  ...contactInfoSchema.shape,
  ...driverLicenseSchema.shape
})

// Residential Information Schema
export const residentialInfoSchema = z.object({
  years: z.string().min(1, 'Years at address is required'),
  months: z.string().default('0'),
  monthlyPayment: z.string().optional(),
  residenceType: z.string().optional()
})

// Previous Residence Schema
export const previousResidenceSchema = z.object({
  ...addressSchema.shape,
  years: z.string().min(1, 'Years at address is required'),
  months: z.string().default('0'),
  monthlyPayment: z.string().optional(),
  residenceType: z.string().optional()
})

// Employment Information Schema
export const employmentInfoSchema = z.object({
  employerName: z.string().min(1, 'Employer name is required'),
  title: z.string().min(1, 'Title/Position is required'),
  businessPhone: z.string().min(1, 'Business phone is required').regex(phoneRegex, 'Invalid phone number'),
  grossMonthlySalary: z.string().min(1, 'Gross monthly salary is required'),
  years: z.string().min(1, 'Years employed is required'),
  months: z.string().default('0'),
  employmentType: z.string().min(1, 'Employment type is required'),
  otherIncome: z.string().optional(),
  otherIncomeSource: z.string().optional(),
  employerStreet: z.string().min(1, 'Employer street address is required'),
  employerZip: z.string().min(1, 'Employer zip code is required').regex(zipCodeRegex, 'Invalid zip code format'),
  employerCity: z.string().min(1, 'Employer city is required'),
  employerState: z.string().min(1, 'Employer state is required')
})

// Previous Employment Schema
export const previousEmploymentSchema = z.object({
  employerName: z.string().min(1, 'Employer name is required'),
  title: z.string().min(1, 'Title/Position is required'),
  businessPhone: z.string().min(1, 'Business phone is required').regex(phoneRegex, 'Invalid phone number'),
  grossMonthlySalary: z.string().min(1, 'Gross monthly salary is required'),
  years: z.string().min(1, 'Years employed is required'),
  months: z.string().default('0'),
  employmentType: z.string().min(1, 'Employment type is required'),
  employerStreet: z.string().min(1, 'Employer street address is required'),
  employerZip: z.string().min(1, 'Employer zip code is required').regex(zipCodeRegex, 'Invalid zip code format'),
  employerCity: z.string().min(1, 'Employer city is required'),
  employerState: z.string().min(1, 'Employer state is required')
})

// Co-buyer Information Schema
export const coBuyerInfoSchema = z.object({
  hasCoBuyer: z.boolean().default(false),
  relationshipType: z.string().optional(),
  clientInfo: clientInfoSchema,
  residentialInfo: residentialInfoSchema,
  previousResidences: z.array(previousResidenceSchema).default([]),
  employmentInfo: employmentInfoSchema,
  previousEmployments: z.array(previousEmploymentSchema).default([])
})

// Main Credit Application Schema
export const creditApplicationSchema = z.object({
  vehicleInfo: vehicleInfoSchema,
  buyerInfo: z.object({
    clientInfo: clientInfoSchema,
    residentialInfo: residentialInfoSchema,
    previousResidences: z.array(previousResidenceSchema).default([]),
    employmentInfo: employmentInfoSchema,
    previousEmployments: z.array(previousEmploymentSchema).default([])
  }),
  coBuyerInfo: coBuyerInfoSchema
})

// Dynamic schema generator based on configuration
export function createDynamicCreditApplicationSchema(config: any) {
  // Base client info schema
  let clientInfo = personalInfoSchema.merge(addressSchema).merge(contactInfoSchema)
  
  // Add driver license fields if enabled
  if (config.driverLicense) {
    clientInfo = clientInfo.merge(driverLicenseSchema)
  }

  // Base employment info schema
  let employmentInfo = z.object({
    employerName: z.string().min(1, 'Employer name is required'),
    title: z.string().min(1, 'Title is required'),
    businessPhone: z.string().min(1, 'Business phone is required').regex(phoneRegex, 'Invalid phone number'),
    grossMonthlySalary: z.string().min(1, 'Gross monthly salary is required'),
    years: z.string().min(1, 'Years is required'),
    months: z.string().default('0'),
    employmentType: z.string().min(1, 'Employment type is required')
  })

  // Add optional fields
  employmentInfo = employmentInfo.extend({
    otherIncome: z.string().optional(),
    otherIncomeSource: z.string().optional()
  })

  // Add employer address if enabled
  if (config.employerAddress) {
    employmentInfo = employmentInfo.extend({
      employerStreet: z.string().min(1, 'Employer street is required'),
      employerZip: z.string().min(1, 'Employer zip is required').regex(zipCodeRegex, 'Invalid zip code'),
      employerCity: z.string().min(1, 'Employer city is required'),
      employerState: z.string().min(1, 'Employer state is required')
    })
  }

  // Base residential info schema
  let residentialInfo = z.object({
    years: z.string().min(1, 'Years is required'),
    months: z.string().default('0'),
    monthlyPayment: z.string().optional(),
    residenceType: z.string().optional()
  })

  // Base vehicle info schema
  let vehicleInfo = z.object({
    vehicle_title: z.string().min(1, 'Vehicle selection is required'),
    down_payment: z.string().min(1, 'Down payment is required')
  })

  // Add optional vehicle fields
  vehicleInfo = vehicleInfo.extend({
    sales_agent: z.string().optional(),
    trade_year: z.string().optional(),
    trade_make: z.string().optional(),
    trade_model: z.string().optional()
  })

  // Buyer info schema
  const buyerInfo = z.object({
    clientInfo,
    residentialInfo,
    previousResidences: z.array(previousResidenceSchema).default([]),
    employmentInfo,
    previousEmployments: z.array(previousEmploymentSchema).default([])
  })

  // Co-buyer info schema (same structure as buyer)
  const coBuyerInfo = z.object({
    hasCoBuyer: z.boolean().default(false),
    relationshipType: z.string().optional(),
    clientInfo: clientInfo.optional(),
    residentialInfo: residentialInfo.optional(),
    previousResidences: z.array(previousResidenceSchema).default([]),
    employmentInfo: employmentInfo.optional(),
    previousEmployments: z.array(previousEmploymentSchema).default([])
  })

  return z.object({
    vehicleInfo,
    buyerInfo,
    coBuyerInfo
  })
}

// Configuration Schema
export const configSchema = z.object({
  primaryColor: z.string().default('#d8534e'),
  showAgents: z.boolean().default(true),
  twoYearEmployment: z.boolean().default(false),
  employerAddress: z.boolean().default(true),
  twoYearResidence: z.boolean().default(false),
  driverLicense: z.boolean().default(false),
  previousResidency: z.boolean().default(true),
  previousResidencyRequiredYear: z.number().default(2),
  successPageEnabled: z.boolean().default(false),
  dealerLocation: z.string().default(''),
  btnType: z.string().default('standard'),
  borderRadius: z.string().default('4px'),
  borderWidth: z.string().default('2px'),
  borderColor: z.string().default('#000000'),
  color: z.string().default('#ffffff'),
  backgroundColor: z.string().default('rgba(0,0,0,1)'),
  hColor: z.string().default('#ffffff'),
  hBorderC: z.string().default('#000000'),
  bgHColor: z.string().default('#000000'),
  opacity: z.string().default('1'),
  thickness: z.string().default('2')
})

// Type exports
export type VehicleInfo = z.infer<typeof vehicleInfoSchema>
export type ClientInfo = z.infer<typeof clientInfoSchema>
export type ResidentialInfo = z.infer<typeof residentialInfoSchema>
export type PreviousResidence = z.infer<typeof previousResidenceSchema>
export type EmploymentInfo = z.infer<typeof employmentInfoSchema>
export type PreviousEmployment = z.infer<typeof previousEmploymentSchema>
export type CoBuyerInfo = z.infer<typeof coBuyerInfoSchema>
export type CreditApplication = z.infer<typeof creditApplicationSchema>
export type Config = z.infer<typeof configSchema>

// State list for dropdowns
export const stateList = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
]

// Employment types
export const employmentTypes = [
  { value: 'employed', label: 'Employed' },
  { value: 'self-employed', label: 'Self Employed' },
  { value: 'retired', label: 'Retired' }
]

// Residence types
export const residenceTypes = [
  { value: 'rent', label: 'Rent' },
  { value: 'own', label: 'Own' }
]

// Relationship types for co-buyer
export const relationshipTypes = [
  { value: 'cohabitant', label: 'Co-habitant' },
  { value: 'parent', label: 'Parent' },
  { value: 'other', label: 'Other' }
]
