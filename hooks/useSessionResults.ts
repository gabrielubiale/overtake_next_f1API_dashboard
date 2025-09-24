import { useQuery } from '@tanstack/react-query'

async function fetchSessionResults(sessionKey: number | "latest") {
   const url = new URL('https://api.openf1.org/v1/session_result')
   url.searchParams.append("session_key", String(sessionKey))

   const response = await fetch(url.toString())

   if(!response.ok) {
        throw new Error('Error - session result api failed')
   }
   return response.json()
}

export function useSessionResults(sessionKey: number | "latest") {
  return useQuery({
    queryKey: ['session_results', sessionKey],
    queryFn: () => fetchSessionResults(sessionKey),
    enabled: !!sessionKey
  })
}