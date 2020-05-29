import React from "react";
import Table from "../Table";
import LoadingIndicator from "../LoadingIndicator";
import { useStateValue } from "../../state";
import { ITableHeaderMap } from "../../types";
import { HeaderH3, SectionContainer, Page } from "../styledElements";

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
        <SectionContainer key={season.seasonId}>
          <HeaderH3>{season.seasonName}</HeaderH3>
          <Table data={season.events} headers={headers} headerMap={headerMap} />
        </SectionContainer>
      ))}
    </Page>
  );
};

export default CalendarContent;
