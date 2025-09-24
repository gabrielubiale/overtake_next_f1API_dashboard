import { useQuery } from '@tanstack/react-query'

async function fetchSessionInformation(sessionKey: number | 'latest') {
  const url = new URL('https://api.openf1.org/v1/sessions')
  url.searchParams.append("session_key", String(sessionKey))

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Error - session result api failed')
  }
  return response.json()
}

export function useSessionInformation(sessionKey: number | 'latest') {
  return useQuery({
    queryKey: ['session_key', sessionKey],
    queryFn: () => fetchSessionInformation(sessionKey),
    enabled: !!sessionKey
  })
}