import React from "react";
import { IStandingRow } from "../../types";
import LoadingIndicator from "../LoadingIndicator";
import Table from "../Table";

interface Props {
  standings: IStandingRow[];
  loading: boolean;
}

const headers = ["driverName", "racesDriven", "points", "powerLimit"];

const headerMap = {
  driverName: "Driver",
  racesDriven: "Races",
  points: "Points",
  powerLimit: "Power Limit",
};
const StandingsContent = ({ standings, loading }: Props) => {
  if (loading || !standings) {
    return <LoadingIndicator />;
  }
  return <Table data={standings} headers={headers} headerMap={headerMap} />;
};

export default StandingsContent;
