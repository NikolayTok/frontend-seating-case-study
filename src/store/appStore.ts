import { create } from 'zustand'

interface AppState {
  loading: boolean
  eventId: string | null
  setLoading: (loading: boolean) => void
  setEventId: (eventId: string | null) => void
}

const useAppStore = create<AppState>((set) => ({
  loading: false,
  eventId: null,
  ticketTypes: [],
  setLoading: (loading) => set({ loading }),
  setEventId: (eventId) => set({ eventId }),
}))

export default useAppStore
