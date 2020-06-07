import React from "react";
import { SectionContainer, HeaderH3 } from "../styledElements";
import Table from "../Table";
import { convertTimeToSecs } from "../../utils";
import { IRaceDetails, ITableHeaderMap } from "../../types";

const qHeaders = [["#", "driverName", "qTime", "group"]];

const qHeaderMap: ITableHeaderMap = {
  "#": { title: "#", dataIndex: 0, alignCenter: true },
  driverName: { title: "Kuljettaja", dataIndex: 1 },
  qTime: { title: "Kierrosaika", dataIndex: 2, alignCenter: true },
  group: { title: "L", dataIndex: 3, alignCenter: true },
};

const raceHeaders = [
  [
    "#",
    "driverName",
    "seasonPoints",
    "group",
    "heatPositions",
    "heatPoints",
    "totalPoints",
  ],
];

const raceHeaderMap: ITableHeaderMap = {
  "#": { title: "#", dataIndex: 0, alignCenter: true },
  driverName: { title: "Kuljettaja", dataIndex: 1 },
  seasonPoints: { title: "P", dataIndex: 2, alignCenter: true },
  group: { title: "L", dataIndex: 3, alignCenter: true },
  heatPositions: { title: "Lähtösijoitukset", dataIndex: 4, alignCenter: true },
  heatPoints: { title: "Lähtöpisteet", dataIndex: 5, alignCenter: true },
  totalPoints: { title: "P", dataIndex: 6, alignCenter: true },
};

interface Props {
  data: IRaceDetails;
}

const RaceResults = ({ data }: Props) => {
  if (!data.details || data.details.length === 0) return null;

  const qDetails = [...data.details]
    .sort((a, b) => {
      const aTime = convertTimeToSecs(a.qTime);
      const bTime = convertTimeToSecs(b.qTime);
      return aTime - bTime;
    })
    .map((driver, i) => ({ ...driver, "#": i + 1 }));

  const raceDetails = data.details
    .map(driver => ({
      ...driver,
      totalPoints: driver.heatPoints.reduce((acc, cur) => acc + cur),
      heatPoints: driver.heatPoints?.join(", "),
      heatPositions: driver.heatPositions?.join(", "),
    }))
    .map((driver, i) => ({ ...driver, "#": i + 1 }));

  return (
    <div>
      {data.qLaps > 0 && !data.trackName2 && (
        <SectionContainer>
          <HeaderH3>Aika-ajotulokset</HeaderH3>
          <Table data={qDetails} headers={qHeaders} headerMap={qHeaderMap} />
        </SectionContainer>
      )}
      <SectionContainer>
        <HeaderH3>Kilpailutulokset</HeaderH3>
        <Table
          data={raceDetails}
          headers={raceHeaders}
          headerMap={raceHeaderMap}
        />
      </SectionContainer>
    </div>
  );
};

export default RaceResults;
