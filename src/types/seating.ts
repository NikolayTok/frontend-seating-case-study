import { TicketType } from "./ticket";

export interface SeatInfo {
  seatId: string;
  place: number;
  ticketTypeId: string;
}

export interface SeatRow {
  seatRow: number;
  seats: SeatInfo[];
}

export interface SeatingData {
  ticketTypes: TicketType[];
  seatRows: SeatRow[];
}
