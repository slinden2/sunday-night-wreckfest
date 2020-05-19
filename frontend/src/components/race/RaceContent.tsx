import React from "react";
import { IRaceDetails } from "../../types";
import Table from "../Table";

interface Props {
  data?: IRaceDetails;
}

const headers = [
  "driverName",
  "seasonPoints",
  "group",
  "heatPositions",
  "heatPoints",
  "qTime",
];

const headerMap = {
  driverName: "Kuljettaja",
  seasonPoints: "P",
  group: "L",
  heatPositions: "Lähtötulokset",
  heatPoints: "Lähtöpisteet",
  qTime: "Aika-ajotulos",
};

const RaceContent = ({ data }: Props) => {
  if (!data) return <div>The race does not exist.</div>;

  const newDetails = data.details.map(driver => ({
    ...driver,
    heatPoints: driver.heatPoints?.join(", "),
    heatPositions: driver.heatPositions?.join(", "),
  }));
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Date</td>
            <td>{data.date}</td>
          </tr>
          <tr>
            <td>Qualifying Laps</td>
            <td>{data.qLaps}</td>
          </tr>
          <tr>
            <td>Race Laps</td>
            <td>{data.raceLaps}</td>
          </tr>
          <tr>
            <td>Power Limit</td>
            <td>{data.hasPowerLimit ? "YES" : "NO"}</td>
          </tr>
        </tbody>
      </table>
      <h2>Results</h2>
      <Table data={newDetails} headers={headers} headerMap={headerMap} />
    </div>
  );
};

export default RaceContent;
