import { useCallback } from 'react'
import { useCreditAppStore, type ApiResponse, type FetchedFormData } from '@/lib/store'

interface FetchDataParams {
  id: string
  deployType?: string
  parentDomain?: string
  parentIP?: string
  baseUrl?: string
}

export function useDataFetching() {
  const {
    isDataLoading,
    dataError,
    setDataLoading,
    setDataError,
    setFetchedData
  } = useCreditAppStore()

  const fetchData = useCallback(async (params: FetchDataParams): Promise<FetchedFormData | null> => {
    const { id, deployType, parentDomain, parentIP } = params
    const baseUrl = process.env.API_BASE_URL || '';

    if (!id) {
      setDataError('ID parameter is required')
      return null
    }

    setDataLoading(true)
    setDataError(null)

    try {
      // Construct the URL similar to your PHP code
      const url = new URL(`${baseUrl}/ca/hard`)
      url.searchParams.set('id', id)
      
      if (deployType) url.searchParams.set('deployType', deployType)
      if (parentDomain) url.searchParams.set('parentDomain', parentDomain)
      if (parentIP) url.searchParams.set('parentIP', parentIP)

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
        return null;
      }

      const result: ApiResponse<FetchedFormData> = await response.json()

      if (result && result?.items && result.error == 0) {
        setFetchedData(result.items)
        return result.items;
      } else {
        setDataError(result.msg || 'An unknown error occurred');
        return null;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      setDataError(errorMessage);
      console.error('Data fetching error:', error)
      return null
    } finally {
      setDataLoading(false)
    }
  }, [setDataLoading, setDataError, setFetchedData])

  const fetchAndPopulate = useCallback(async (params: FetchDataParams) => {
    const data = await fetchData(params)
    return data
  }, [fetchData])

  return {
    fetchData,
    fetchAndPopulate,
    isDataLoading,
    dataError
  }
}
