import { create } from 'zustand';

export const seasonRaces = create((set) => ({

    season: '2025',
    setSeason: (season) => set({season}),

    allRaces: [],
    setAllRaces: (allRaces) => set({allRaces: races})

}))