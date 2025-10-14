import { create } from 'zustand'

export const SessionsInformation = create((set) => ({
    sessionKeySelected: 'latest',
    setSessionKeysSelected: (sessionKeySelected) => set({sessionKeySelected}),
}))

export const DriversInformation = create((set) => ({
    driversSearched: [],
    setDriversSearched: (driver) =>
    set((state) => ({
      driversSearched: [...state.driversSearched, driver],
    }))
}))
