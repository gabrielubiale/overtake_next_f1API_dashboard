// client component
'use client'

import { SessionsInformation, DriversInformation } from '../store/useRaceStore'
import { useSessionResults } from "@/hooks/useSessionResults"
import { useSessionInformation } from '@/hooks/useSessionInformation'
import { SessionResults } from "@/components/SessionResults"
import { DriversVisited } from '@/components/DriversVisited'

export default function Home() {

  // get the session key from zustand
  const { sessionKeySelected } = SessionsInformation()

  const { driversSearched } = DriversInformation()

  const { data, isLoading, error } = useSessionResults(sessionKeySelected)
  const { data: sessionInfo, isLoading: sessionInfoLoading, error: sessionInfoError } = useSessionInformation(sessionKeySelected)

  const mockCirciutData = {
    circuit_short_name: 'Montreal',
    country_name: 'Canada',
    data_end: '15 jun 2025'
  }

  // if request fail use mock data to avoid error
  const firstSession = sessionInfo && sessionInfo.length > 0
    ? sessionInfo[0]
    : mockCirciutData

  const { circuit_short_name, country_name, date_end } = firstSession

  return (
    <div className="font-sans min-h-screen bg-gray-100 text-gray-900 p-8 sm:p-20">

      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2">Formula 1</h1>
        <p className="text-gray-600">Check some insightful datas from F1</p>
      </header>

      {/* Cards de destaque */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold mb-2">Next race</h2>
          <p className="text-gray-500">Singapore grand prix</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold mb-2">Championship leader</h2>
          <p className="text-gray-500">Oscar Piastri</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold mb-2">Team leader</h2>
          <p className="text-gray-500">McLaren</p>
        </div>
      </div>

      {driversSearched && driversSearched.length > 0 &&
        <DriversVisited />
      }

      {/* Last race results */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Last race results</h2>

        {sessionInfoLoading && <p>Session information loaging</p>}
        {sessionInfoError && <p>An error has ocorred in fetch session information</p>}
        {sessionInfo && (
          <div className="w-full flex flex-col md:flex-row md:items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg mb-5">

            <div className="flex flex-row gap-2 font-semibold text-gray-900 dark:text-gray-100">
              <span>{country_name}</span>
              <span>{circuit_short_name}</span>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 flex gap-2 items-center">
              <span className="font-medium">Date:</span>
              <span>{date_end}</span>
            </div>
          </div>
        )}

        {/* session results */}
        {isLoading && <p>Loading results...</p>}
        {error && <p>Error on results fetch</p>}
        {data && <SessionResults results={data} />}
      </section>

      <footer className="mt-12 text-center text-gray-500">
        OverTake - A F1 Dashboard
      </footer>
    </div>
  )
}
