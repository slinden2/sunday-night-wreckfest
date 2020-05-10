import React from "react";
import { IRaceCalendarEvent } from "../../types";

interface Props {
  events: IRaceCalendarEvent[];
  loading: boolean;
}

const CalendarContent = ({ events, loading }: Props) => {
  if (loading || !events) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {events.map(event => (
        <div key={event.eventId}>{event.eventId}</div>
      ))}
    </div>
  );
};

export default CalendarContent;
