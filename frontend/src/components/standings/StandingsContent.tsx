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
const StandingsContent = ({ standings }: Props) => {
  if (!standings.length) return <div>No standings found.</div>;

  return (
    <div>
      <h2>{standings[0].seasonName}</h2>
      <Table data={standings} headers={headers} headerMap={headerMap} />
    </div>
  );
};

export default StandingsContent;
