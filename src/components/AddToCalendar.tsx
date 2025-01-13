import React from "react";
import { Button } from "./ui/button";

interface AddToCalendarProps {
  eventName: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
}

export const AddToCalendar: React.FC<AddToCalendarProps> = ({
  eventName,
  description,
  location,
  startDate,
  endDate,
}) => {
  const handleAddToCalendar = () => {

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//YourAppName//YourProductID//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${generateUID()}`,
      `DTSTAMP:${formatDateForICS(new Date().toISOString())}`,
      `SUMMARY:${eventName}`,
      `DESCRIPTION:${foldLine(description)}`,
      `LOCATION:${location}`,
      `DTSTART:${formatDateForICS(startDate)}`,
      `DTEND:${formatDateForICS(endDate)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${eventName.replace(/\s+/g, "_")}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatDateForICS = (date: string) => {
    const d = new Date(date);
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const foldLine = (line: string) => {
    if (line.length <= 75) return line;
    return line.match(/.{1,73}/g)?.join("\r\n ") ?? line;
  };

  const generateUID = () => {
    return `${Date.now()}-${Math.random().toString(36)}@yourapp.com`;
  };

  return (
    <Button
      variant="secondary"
      onClick={handleAddToCalendar}
      className="bg-blue-500 text-white hover:bg-blue-600"
    >
      Add to Calendar
    </Button>
  );
};
