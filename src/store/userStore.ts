import ApiService from '@/service/ApiBaseService'
import useAppStore from './appStore'
import { create } from 'zustand'
import { toast } from 'react-toastify'
import { User } from '@/types/user'

interface UserState {
  user: User | null
  isLoggedIn: boolean
  openLoginModal: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setOpenLoginModal: (isOpenLoginModal: boolean) => void
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  openLoginModal: false,
  login: async (email, password) => {
    const setLoading = useAppStore.getState().setLoading
    try {
      setLoading(true)
      const response = await ApiService.login({ email, password })
      set({ user: response.user, isLoggedIn: true })
      toast.success('Login successful!')
    } catch {
      toast.error('Invalid login credentials!')
    } finally {
      setLoading(false)
    }
  },
  logout: () => {
    set({ user: null, isLoggedIn: false })
    toast.info('You have been logged out.')
  },
  setOpenLoginModal: (openLoginModal) => set({ openLoginModal }),
}))

export default useUserStore
