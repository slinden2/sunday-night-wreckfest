import React from "react";
import { ISeason } from "../../types";
import Table from "../Table";
import LoadingIndicator from "../LoadingIndicator";

interface Props {
  seasons: ISeason[];
  loading: boolean;
}

const headerMap = {
  date: "Date",
  trackName: "Track",
  qLaps: "Q Laps",
  raceLaps: "Race Laps",
  link: "Results",
};

const headers = ["date", "trackName", "qLaps", "raceLaps", "link"];

const CalendarContent = ({ seasons, loading }: Props) => {
  if (loading || !seasons) {
    return <LoadingIndicator />;
  }

  return (
    <>
      {seasons.map(season => (
        <div key={season.seasonId}>
          <h2>{season.seasonName}</h2>
          <Table data={season.events} headers={headers} headerMap={headerMap} />
        </div>
      ))}
    </>
  );
};

export default CalendarContent;
