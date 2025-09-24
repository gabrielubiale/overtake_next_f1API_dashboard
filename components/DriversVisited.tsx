'use client'

import { useState } from 'react'
import { DriversInformation } from '../store/useRaceStore'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export function DriversVisited() {

  const { driversSearched } = DriversInformation()
  const [ openInformations, setOpenInformations ] = useState(true)

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-5" onClick={ () => setOpenInformations(!openInformations)}>
      <div className='flex justify-center items-center cursor-pointer mb-3'>
        <h2 className="text-2xl font-bold">Visualized drivers</h2>
        {openInformations ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </div>
      {openInformations && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {driversSearched.map((driver: any) => (
            <div
              key={driver.driver_number}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
            >
              <img
                src={driver.headshot_url || '/placeholder-driver.png'}
                alt={driver.full_name}
                width={80}
                height={80}
                className="rounded-full border-2 border-sky-500 mb-2"
              />
              <p className="font-semibold text-gray-900">{driver.first_name} {driver.last_name}</p>
              <p className="text-gray-500 text-sm">{driver.team_name}</p>
              <p className="text-gray-400 text-xs">#{driver.driver_number}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
