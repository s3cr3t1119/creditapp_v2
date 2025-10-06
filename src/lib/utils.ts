import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useCreditAppStore } from "./store";
import moment from 'moment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getVehicleInfo(iId: string) {
  const fetchedData = useCreditAppStore.getState().fetchedData;
  if (!fetchedData || !Array.isArray(fetchedData.inventory) || iId === 'Any Car'){
    return {
      vehicle_id: '',
      vehicle_title: 'Any Car',
      vehicle_make: '',
      vehicle_model: '',
      vehicle_year: '',
      vehicle_vin: ''
    };
  }

  let inventory = fetchedData.inventory.find((inventory: any) => inventory.id === iId);
  if (!inventory) {
    return {
      vehicle_id: '',
      vehicle_title: 'Any Car',
      vehicle_make: '',
      vehicle_model: '',
      vehicle_year: '',
      vehicle_vin: ''
    };
  }
  return {
    vehicle_id: inventory?.id,
    vehicle_title: `${inventory?.make} ${inventory?.model} ${inventory?.year} - VIN: ${inventory?.vin}`,
    vehicle_make: inventory?.make,
    vehicle_model: inventory?.model,
    vehicle_year: inventory?.year,
    vehicle_vin: inventory?.vin
  };
}

export function parseSubmitData(data: any) {
  const fetchedData = useCreditAppStore.getState().fetchedData;

  const vehicleDetail = getVehicleInfo(data.vehicleInfo.vehicle_title);
  const payload = {
    id: fetchedData?.token,
    ...data.vehicleInfo,
    ...vehicleDetail,
    agent_id: data.vehicleInfo.sales_agent == 'none' ? '' : data.vehicleInfo.sales_agent,
    agent_name: data.vehicleInfo.sales_agent == 'none' ? '' : fetchedData?.financing?.agents?.find((agent: any) => agent.id === data.vehicleInfo.sales_agent)?.fullName,
    ...data.buyerInfo.clientInfo,
    dob_year: moment(data.buyerInfo.clientInfo.dob).year(),
    dob_month: moment(data.buyerInfo.clientInfo.dob).month(),
    dob_day: moment(data.buyerInfo.clientInfo.dob).day(),
    dob_format: data.buyerInfo.clientInfo.dob,
    dob: moment(data.buyerInfo.clientInfo.dob).format('YYYY-MM-DD'),
    country: 'United States',
    country_employment: 'United States',
    ...data.buyerInfo.residentialInfo,
    time_residence: moment(data.buyerInfo.residentialInfo.res_years).year() + ' Years, ' + moment(data.buyerInfo.residentialInfo.res_months).month() + ' Months',
    ...data.buyerInfo.employmentInfo,
    time_employment: moment(data.buyerInfo.employmentInfo.time_company_years).year() + ' Years, ' + moment(data.buyerInfo.employmentInfo.time_company_months).month() + ' Months',
    ...data.buyerInfo.previousEmployments,
    ...data.buyerInfo.previousResidences,
    joint_application: data.has_cobuyer ? 'yes' : 'no'
  }

  // ...(data.has_cobuyer && {
  //   ...data.coBuyerInfo.relationship,
  //   ...data.coBuyerInfo.clientInfo,
  //   ...data.coBuyerInfo.residentialInfo,
  //   ...data.coBuyerInfo.employmentInfo,
  //   ...data.coBuyerInfo.previousEmployments,
  //   ...data.coBuyerInfo.previousResidences,
  //   ...data.coBuyerInfo.clientInfo,
  //   ...data.coBuyerInfo.residentialInfo,
  //   ...data.coBuyerInfo.employmentInfo,
  //   ...data.coBuyerInfo.previousEmployments,
  //   ...data.coBuyerInfo.previousResidences,
  // })

  console.log(payload);
  return payload;
}
