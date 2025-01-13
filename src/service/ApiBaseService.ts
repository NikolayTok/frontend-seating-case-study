import { EventDetail } from "@/types/event"
import { CreateOrderPayload, Order } from "@/types/order"
import { SeatingData } from "@/types/seating"
import { LoginRequest, LoginResponse } from "@/types/user"

class ApiService {
  static BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // get event info
  static async fetchEvent(): Promise<EventDetail> {
    const response = await fetch(`${this.BASE_URL}/event`)
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`)
    }
    return response.json()
  }
  // get seating plan
  static async fetchSeatingData(eventId: string): Promise<SeatingData> {
    const response = await fetch(`${this.BASE_URL}/event-tickets?eventId=${eventId}`)
    if (!response.ok) {
      throw new Error(
        `Failed to fetch tickets for event ${eventId}: ${response.statusText}`
      )
    }
    return response.json()
  }
  // create order
  static async createOrder(payload: CreateOrderPayload): Promise<Order> {
    const response = await fetch(`${this.BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.statusText}`)
    }
    return response.json()
  }
  //login
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      throw new Error(`Failed to login: ${response.statusText}`)
    }
    return response.json()
  }
}

export default ApiService
