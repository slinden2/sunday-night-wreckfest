import React from "react";
import { IRaceCalendarEvent } from "../../types";
import Table from "../Table";
import LoadingIndicator from "../LoadingIndicator";

interface Props {
  events: IRaceCalendarEvent[];
  loading: boolean;
}

const headerMap = {
  date: "Date",
  trackName: "Track",
  qLaps: "Q Laps",
  raceLaps: "Race Laps",
};

const headers = ["date", "trackName", "qLaps", "raceLaps"];

const CalendarContent = ({ events, loading }: Props) => {
  if (loading || !events) {
    return <LoadingIndicator />;
  }

  return <Table data={events} headers={headers} headerMap={headerMap} />;
};

export default CalendarContent;
