import { create } from 'zustand'

export const SessionsInformation = create((set) => ({

    sessionKeySelected: 'latest',
    setSessionKeysSelected: (sessionKeySelected) => set({session})

}))