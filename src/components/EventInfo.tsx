import { useEffect, useState } from "react";
import ApiService from "@/service/ApiBaseService";
import useAppStore from "@/store/appStore";
import { EventDetail } from "@/types/event";
import { formatDate } from "@/utils/formatDate";
import { Loader } from "./ui/loader";
import { AddToCalendar } from "./AddToCalendar";
import { toast } from "react-toastify";

export default function EventInfo() {
  const loading = useAppStore((s) => s.loading);
  const setLoading = useAppStore((s) => s.setLoading);
  const setEventId = useAppStore((s) => s.setEventId);
  const [eventDetail, setEventDetail] = useState<EventDetail | null>(null)

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const events = await ApiService.fetchEvent();
        if (events.eventId) {
          setEventId(events.eventId)
          setEventDetail(events)
        }
      } catch {
        toast.error("Error fetching events");
      } finally {
        setLoading(false)
      }
    })();
  }, [])

  if (loading) {
    return (
      <aside className="w-full max-w-sm bg-white rounded-md shadow-sm p-3 flex justify-center items-center h-32">
        <Loader />
      </aside>
    );
  }

  return (
    <aside className="w-full max-w-sm bg-white rounded-md shadow-sm p-3 flex flex-col gap-2 lg:w-3/4 mx-auto">
      {/* event header image placeholder */}
      {eventDetail?.headerImageUrl ? (
        <img
          src={eventDetail.headerImageUrl}
          alt={eventDetail.namePub || "Event"}
          className="rounded-md h-32 w-full object-cover"
        />
      ) : (
        <div className="bg-zinc-100 rounded-md h-full lg:h-32 flex items-center justify-center">
          <p className="text-sm text-zinc-500">No image available</p>
        </div>
      )}
      {/* event name */}
      <h1 className="text-xl text-zinc-900 font-semibold">{eventDetail?.namePub}</h1>
      {/* event name */}
      <span className="text-xs text-zinc-600 font-semibold">{formatDate(eventDetail?.dateFrom as string)} - {formatDate(eventDetail?.dateTo as string)}</span>
      {/* event description */}
      <p className="text-sm text-zinc-500 lg:max-h-52 max-h-none  overflow-y-auto">{eventDetail?.description}</p>
      {/* event place */}
      <p className="text-sm font-medium">
        📍 <span className="text-zinc-600">{eventDetail?.place}</span>
      </p>
      {/* add to calendar button */}
      {eventDetail && <AddToCalendar
        eventName={eventDetail?.namePub}
        description={eventDetail?.description}
        location={eventDetail?.place}
        startDate={eventDetail?.dateFrom}
        endDate={eventDetail?.dateTo}
      />}
    </aside>
  )
}
