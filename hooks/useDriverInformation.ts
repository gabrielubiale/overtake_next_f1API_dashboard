import { useQuery } from '@tanstack/react-query'

async function fetchDrivernformation(driver_number: number, sessionKeySelected: number) {
  const url = new URL('https://api.openf1.org/v1/drivers')
  url.searchParams.append("driver_number", String(driver_number))
  url.searchParams.append("session_key", String(sessionKeySelected))

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Error - session result api failed')
  }
  return response.json()
}

export function useDriverInformation(driver_number: number, sessionKeySelected: number) {
  return useQuery({
    queryKey: ['driver_number', driver_number],
    queryFn: () => fetchDrivernformation(driver_number, sessionKeySelected),
    enabled: !!driver_number
  })
}