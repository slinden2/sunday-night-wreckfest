import React from "react";
import { IRaceDetails } from "../../types";
import Table from "../Table";

interface Props {
  raceDetails: IRaceDetails;
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

const RaceContent = ({ raceDetails }: Props) => {
  const newDetails = raceDetails.details.map(driver => ({
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
            <td>{raceDetails.date}</td>
          </tr>
          <tr>
            <td>Qualifying Laps</td>
            <td>{raceDetails.qLaps}</td>
          </tr>
          <tr>
            <td>Race Laps</td>
            <td>{raceDetails.raceLaps}</td>
          </tr>
          <tr>
            <td>Power Limit</td>
            <td>{raceDetails.hasPowerLimit ? "YES" : "NO"}</td>
          </tr>
        </tbody>
      </table>
      <h2>Results</h2>
      <Table data={newDetails} headers={headers} headerMap={headerMap} />
    </div>
  );
};

export default RaceContent;
