import React from "react";
import { IStandingRow } from "../../types";
import Table from "../Table";

interface Props {
  standings: IStandingRow[];
}

const headers = ["driverName", "racesDriven", "points", "powerLimit"];

const headerMap = {
  driverName: "Driver",
  racesDriven: "Races",
  points: "Points",
  powerLimit: "Power Limit",
};

const sortByDrawPosition = (a: IStandingRow, b: IStandingRow) => {
  if (a.drawPosition && b.drawPosition) {
    return a.drawPosition - b.drawPosition;
  } else {
    return 0;
  }
};

const StandingsContent = ({ standings }: Props) => {
  if (!standings.length) return <div>No standings found.</div>;

  const sortedStandings = standings.sort(
    (a, b) => b.points - a.points || sortByDrawPosition(a, b)
  );

  return (
    <div>
      <h2>{standings[0].seasonName}</h2>
      <Table data={sortedStandings} headers={headers} headerMap={headerMap} />
    </div>
  );
};

export default StandingsContent;
