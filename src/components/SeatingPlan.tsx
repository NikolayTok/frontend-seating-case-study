import { Seat } from "./Seat";
import { useEffect, useState } from "react";
import { SeatingData, SeatRow } from "@/types/seating";
import { useCartStore } from "@/store/cartStore";
import { Loader } from "./ui/loader";
import { toast } from "react-toastify";
import ApiService from "@/service/ApiBaseService";
import useAppStore from "@/store/appStore";

export default function SeatingPlan() {
  const eventId = useAppStore((s) => s.eventId);
  const loading = useAppStore((s) => s.loading);
  const setLoading = useAppStore((s) => s.setLoading);
  const setTicketTypes = useCartStore((s) => s.setTicketTypes);
  const [seatingData, setSeatingData] = useState<SeatingData | null>(null)

  useEffect(() => {
    if (eventId) {
      (async () => {
        setLoading(true)
        try {
          const data = await ApiService.fetchSeatingData(eventId);
          if (data) {
            setSeatingData(data)
            setTicketTypes(data.ticketTypes)
          }
        } catch {
          toast.error("Error fetching seating plan");
        } finally {
          setLoading(false)
        }
      })();
    }
  }, [eventId])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col gap-4 lg:w-[70%] max-h-[68vh] overflow-y-auto w-full">
      {/*	seating map */}
      {seatingData?.seatRows.map((row: SeatRow) => (
        <div key={row.seatRow} className="flex flex-col gap-2">
          {/* Row number */}
          <div className="text-center font-bold text-gray-600">Row {row.seatRow}</div>
          {/* Seats */}
          <div className="flex justify-center gap-1">
            {row?.seats
              ?.sort((a, b) => a.place - b.place)
              .map((seat) => (
                <Seat key={seat.seatId} seat={seat} />
              ))}
          </div>
        </div>
      ))
      }
    </div>
  )
}
