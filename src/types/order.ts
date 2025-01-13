import { CartItem } from "@/store/cartStore";
import { TicketType } from "./ticket";
import { User } from "./user";

export interface Order {
  id: string;
  eventId: string;
  tickets: TicketType[];
  totalPrice: number;
}

export interface CreateOrderPayload {
  eventId: string;
  tickets: CartItem[];
  user: User
}
