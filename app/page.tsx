'use client'

import { seasonRaces } from '../store/useRaceStore'
import { useSessionResults } from "@/hooks/useSessionResults";
import { SessionResults } from "@/components/SessionResults";

export default function Home() {
  const { season, setSeason, allRaces, setRaces } = seasonRaces()
  const { data, isLoading, error } = useSessionResults(7782)

  return (
    <div className="font-sans min-h-screen bg-gray-100 text-gray-900 p-8 sm:p-20">
      
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2">Fórmula 1 - Temporada {season}</h1>
        <p className="text-gray-600">Confira os resultados das sessões mais recentes</p>
      </header>

      {/* Cards de destaque */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold mb-2">Corrida Atual</h2>
          <p className="text-gray-500">Grande Prêmio de exemplo</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold mb-2">Piloto Líder</h2>
          <p className="text-gray-500">Número 1</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold mb-2">Equipe Destaque</h2>
          <p className="text-gray-500">Exemplo Racing Team</p>
        </div>
      </div>

      {/* Resultados da sessão */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Last sessions results</h2>

        {isLoading && <p>Loading results...</p>}
        {error && <p>Error on results fetch</p>}
        {data && <SessionResults results={data} />}
      </section>

      {/* Footer simples */}
      <footer className="mt-12 text-center text-gray-500">
        OverTake - A F1 Dashboard
      </footer>
    </div>
  )
}
