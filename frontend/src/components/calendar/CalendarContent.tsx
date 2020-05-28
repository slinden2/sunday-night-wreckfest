import React from "react";
import styled from "styled-components";

import Table from "../Table";
import LoadingIndicator from "../LoadingIndicator";
import { useStateValue } from "../../state";
import { ITableHeaderMap } from "../../types";

const Page = styled.div`
  margin-top: 5rem;
`;

const TableContainer = styled.div`
  margin-bottom: 5rem;
`;

const TableTitle = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;

  ${props => props.theme.media.tablet} {
    font-size: 2rem;
  }
`;

const headerMap: ITableHeaderMap = {
  date: { title: "Päivämäärä", rowSpan: 2, dataIndex: 0 },
  trackName: { title: "Rata", rowSpan: 2, dataIndex: 1 },
  laps: { title: "Kierrokset", colSpan: 2, alignCenter: true },
  qLaps: { title: "Q", dataIndex: 2, alignCenter: true },
  raceLaps: { title: "R", dataIndex: 3, alignCenter: true },
  link: { title: "Tulokset", rowSpan: 2, dataIndex: 4, alignCenter: true },
};

const headersRow1 = ["date", "trackName", "laps", "link"];
const headersRow2 = ["qLaps", "raceLaps"];

const headers = [headersRow1, headersRow2];

const CalendarContent = () => {
  const [{ calendar }] = useStateValue();
  const isLoading = calendar.length === 0;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Page>
      {calendar.map(season => (
        <TableContainer key={season.seasonId}>
          <TableTitle>{season.seasonName}</TableTitle>
          <Table data={season.events} headers={headers} headerMap={headerMap} />
        </TableContainer>
      ))}
    </Page>
  );
};

export default CalendarContent;
