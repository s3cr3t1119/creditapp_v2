import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AgentInfo, InventoryInfo, PreviousEmployment, PreviousResidence, useCreditAppStore, ZipCodeInfo } from "./store";
import moment from 'moment';
import { toast } from "react-toastify";
import { UseFormReturn } from "react-hook-form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPreviousInfo(data: PreviousResidence[] | PreviousEmployment[] , type: string) {
  const prefix = type === 'buyer' ? 'prev_' : 'prev_co_';
  if (data && data.length > 0) {
    const items = data[0];
    return Object.fromEntries(
      Object.entries(items).map(([key, value]) => [`${prefix}${key}`, value])
    );
  }
  return null;
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

  const inventory = fetchedData.inventory.find((inventory: InventoryInfo) => inventory.id === iId);
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
  const prevResidence = getPreviousInfo(data.buyerInfo.previousResidences, 'buyer');
  const prevEmployment = getPreviousInfo(data.buyerInfo.previousEmployments, 'buyer');
  const coPrevResidence = getPreviousInfo(data.coBuyerInfo.previousResidences, 'cobuyer');
  const coPrevEmployment = getPreviousInfo(data.coBuyerInfo.previousEmployments, 'cobuyer');
  const payload = {
    id: fetchedData?.token,
    ...data.vehicleInfo,
    ...vehicleDetail,
    agent_id: data.vehicleInfo.sales_agent == 'none' ? '' : data.vehicleInfo.sales_agent,
    agent_name: data.vehicleInfo.sales_agent == 'none' ? '' : fetchedData?.financing?.agents?.find((agent: AgentInfo) => agent.id === data.vehicleInfo.sales_agent)?.fullName,
    ...data.buyerInfo.clientInfo,
    fullname: data.buyerInfo.clientInfo.firstName + ' ' + data.buyerInfo.clientInfo.lastName,
    fullcity: data.buyerInfo.clientInfo.city + ' ' + data.buyerInfo.clientInfo.state + ' ' + data.buyerInfo.clientInfo.zip + ' United States',
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
    ...prevEmployment,
    ...prevResidence,
    joint_application: data.has_cobuyer ? 'yes' : 'no',
    ...(data.has_cobuyer && {
      co_fullname: data.coBuyerInfo.clientInfo.firstName + ' ' + data.coBuyerInfo.clientInfo.lastName,
      co_fullcity: data.coBuyerInfo.clientInfo.city + ' ' + data.coBuyerInfo.clientInfo.state + ' ' + data.coBuyerInfo.clientInfo.zip + ' United States',
      co_country: 'United States',
      co_country_employment: 'United States',
      co_res_years: data.coBuyerInfo.residentialInfo.res_years,
      co_res_months: data.coBuyerInfo.residentialInfo.res_months,
      co_time_company_years: data.coBuyerInfo.employmentInfo.time_company_years,
      co_time_company_months: data.coBuyerInfo.employmentInfo.time_company_months,
      co_dob_year: moment(data.coBuyerInfo.clientInfo.dob).year(),
      co_dob_month: moment(data.coBuyerInfo.clientInfo.dob).month(),
      co_dob_day: moment(data.coBuyerInfo.clientInfo.dob).day(),
      co_dob_format: data.coBuyerInfo.clientInfo.dob,
      co_dob: moment(data.coBuyerInfo.clientInfo.dob).format('YYYY-MM-DD'),
      ...coPrevResidence,
      ...coPrevEmployment
    })
  }

  console.log(payload);
  return payload;
}

export async function getZipCode(
  zip: string,
  type: string, 
  form: UseFormReturn<any>,
  onMultipleResults?: (items: ZipCodeInfo[], zip: string, type: string) => void
) {
  const fetchedData = useCreditAppStore.getState().fetchedData;
  const payload = {
    id: fetchedData?.token,
    zip: zip
  }

  try {
    const response = await fetch('/api/zipcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()
    if (result.success) {
      // populate the city/state or show decoded zipcode list
      if (result.content.items.length == 1) {
        const item = result.content.items[0];
        if (type.toLowerCase().includes('employment')) {
          form.setValue(`${type}.employer_city`, item.city);
          form.setValue(`${type}.employer_state`, item.state);
        } else {
          form.setValue(`${type}.city`, item.city);
          form.setValue(`${type}.state`, item.state);
        }
      } else if (result.content.items.length > 1) {
        if (onMultipleResults) {
          onMultipleResults(result.content.items, zip, type);
        } else {
          toast.info(`Multiple cities found for zip ${zip}. Please select from the list.`);
          const item = result.content.items[0];
          if (type.toLowerCase().includes('employment')) {
            form.setValue(`${type}.employer_city`, item.city);
            form.setValue(`${type}.employer_state`, item.state);
          } else {
            form.setValue(`${type}.city`, item.city);
            form.setValue(`${type}.state`, item.state);
          }
        }
      } else {
        // No matches found
        if (type.toLowerCase().includes('employment')) {
          form.setValue(`${type}.employer_city`, '');
          form.setValue(`${type}.employer_state`, '');
        } else {
          form.setValue(`${type}.city`, '');
          form.setValue(`${type}.state`, '');
        }
        toast.warning(`No city found for zip code : ${zip}`);
      }
    } else {
      toast.error(result.msg || 'Failed to decode zipcode. Please try again.')
    }
  } catch (error) {
    console.error('Error decoding zipcode:', error);
    toast.error('Failed to decode zipcode. Please try again.')
  } finally {
  }
}
