import { TicketType } from '@/types/ticket'
import { User } from '@/types/user'
import { create } from 'zustand'

export interface CartItem {
  seatId: string
  ticketTypeId: string
  place: number
}

interface CartStore {
  cart: CartItem[]
  ticketTypes: TicketType[]
  guestData: User | undefined
  cartModalOpen: boolean
  finalStepOpen: boolean
  modeSelectModalOpen: boolean
  setGuestData: (guestData: User | undefined) => void
  addToCart: (seatId: string, ticketTypeId: string, place: number) => void
  removeFromCart: (seatId: string) => void
  setTicketTypes: (ticketTypes: TicketType[]) => void
  totalTickets: () => number
  totalPrice: () => number
  isInCart: (seatId: string) => boolean
  clearCart: () => void
  setCartModalOpen: (cartModalOpen: boolean) => void
  setFinalStepOpen: (finalStepOpen: boolean) => void
  setModeSelectModalOpen: (modeSelectModalOpen: boolean) => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  ticketTypes: [],
  guestData: undefined,
  cartModalOpen: false,
  finalStepOpen: false,
  modeSelectModalOpen: false,
  addToCart: (seatId, ticketTypeId, place) =>
    set((state) => ({
      cart: [...state.cart, { seatId, ticketTypeId, place }],
    })),
  removeFromCart: (seatId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.seatId !== seatId),
    })),
  setTicketTypes: (ticketTypes) => set({ ticketTypes }),
  totalTickets: () => get().cart.length,
  totalPrice: () => {
    const { cart, ticketTypes } = get()
    return cart.reduce((acc, item) => {
      const ticketType = ticketTypes.find(
        (type) => type.id === item.ticketTypeId
      )
      return acc + (ticketType ? ticketType.price : 0)
    }, 0)
  },
  isInCart: (seatId) => {
    return get().cart.some((item) => item.seatId === seatId)
  },
  setGuestData: (guestData) => set({ guestData }),
  clearCart: () => set({ cart: [] }),
  setCartModalOpen: (cartModalOpen) => set({ cartModalOpen }),
  setFinalStepOpen: (finalStepOpen) => set({ finalStepOpen }),
  setModeSelectModalOpen: (modeSelectModalOpen) => set({ modeSelectModalOpen }),
}))
