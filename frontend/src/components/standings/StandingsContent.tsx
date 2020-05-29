import React from "react";
import { IStandingRow } from "../../types";
import Table from "../Table";
import { HeaderH3, Page } from "../styledElements";

interface Props {
  standings: IStandingRow[];
}

const headers = [["driverName", "racesDriven", "points", "powerLimit"]];

const headerMap = {
  driverName: { title: "Kuljettaja", dataIndex: 0 },
  racesDriven: { title: "Kilpailut", dataIndex: 1, alignCenter: true },
  points: { title: "P", dataIndex: 2, alignCenter: true },
  powerLimit: { title: "Tehoraja", dataIndex: 3, alignCenter: true },
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
    <Page>
      <HeaderH3>{standings[0].seasonName}</HeaderH3>
      <Table data={sortedStandings} headers={headers} headerMap={headerMap} />
    </Page>
  );
};

export default StandingsContent;
