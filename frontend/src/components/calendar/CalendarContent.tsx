import React from "react";
import Table from "../Table";
import LoadingIndicator from "../LoadingIndicator";
import { useStateValue } from "../../state";

const headerMap = {
  date: "Date",
  trackName: "Track",
  qLaps: "Q Laps",
  raceLaps: "Race Laps",
  link: "Results",
};

const headers = ["date", "trackName", "qLaps", "raceLaps", "link"];

const CalendarContent = () => {
  const [{ calendar }] = useStateValue();
  const isLoading = calendar.length === 0;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      {calendar.map(season => (
        <div key={season.seasonId}>
          <h2>{season.seasonName}</h2>
          <Table data={season.events} headers={headers} headerMap={headerMap} />
        </div>
      ))}
    </>
  );
};

export default CalendarContent;
