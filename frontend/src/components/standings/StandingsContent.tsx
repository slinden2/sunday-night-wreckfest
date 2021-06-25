/* 
Display standings
*/

import React from "react";
import { IStandingRow } from "../../types";
import Table from "../Table";
import { HeaderH3, Page } from "../styledElements";

interface Props {
  standings: IStandingRow[];
  teamStandings?: { name: string; points: number }[];
}

const headers = [["#", "driverName", "racesDriven", "points", "powerLimit"]];

const headerMap = {
  "#": { title: "#", dataIndex: 0, alignCenter: true },
  driverName: { title: "Kuljettaja", dataIndex: 1 },
  racesDriven: { title: "Kilpailut", dataIndex: 2, alignCenter: true },
  points: { title: "P", dataIndex: 3, alignCenter: true },
  powerLimit: { title: "Tehoraja", dataIndex: 4, alignCenter: true },
};

const teamHeaders = [["#", "name", "points"]];

const teamHeaderMap = {
  "#": { title: "#", dataIndex: 0, alignCenter: true },
  name: { title: "Tiimi", dataIndex: 1 },
  points: { title: "P", dataIndex: 2, alignCenter: true },
};

const sortByDrawPosition = (a: IStandingRow, b: IStandingRow) => {
  if (a.drawPosition && b.drawPosition) {
    return a.drawPosition - b.drawPosition;
  } else {
    return 0;
  }
};

const StandingsContent = ({ standings, teamStandings }: Props) => {
  if (!standings.length) return <div>No standings found.</div>;

  const sortedStandings = standings
    .sort((a, b) => b.points - a.points || sortByDrawPosition(a, b))
    .map((driver, i) => ({ ...driver, "#": i + 1 }));

  return (
    <Page>
      <HeaderH3>{standings[0].seasonName}</HeaderH3>
      <Table data={sortedStandings} headers={headers} headerMap={headerMap} />
      {(teamStandings && teamStandings.length) ? (
        <Table
          data={teamStandings}
          headers={teamHeaders}
          headerMap={teamHeaderMap}
          marginTop="3rem"
        />
      ) : null}
    </Page>
  );
};

export default StandingsContent;
