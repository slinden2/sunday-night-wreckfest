import React from "react";
import styled, { css } from "styled-components";
import Table from "../Table";
import LoadingIndicator from "../LoadingIndicator";
import { useStateValue } from "../../state";
import { ITableHeaderMap, ISeason } from "../../types";
import { HeaderH3, SectionContainer, Page } from "../styledElements";

const CalendarSelector = styled.div`
  display: flex;
  justify-content: center;
`;

const SelectionButton = styled.span<{ isActive: boolean }>`
  margin: 0 1rem;
  cursor: pointer;

  ${props =>
    props.isActive &&
    css`
      font-weight: 800;
      text-decoration: underline;
    `}
`;

enum SelectedCal {
  Tulevat = "Tulevat",
  Menneet = "Menneet",
}

const headerMap: ITableHeaderMap = {
  "#": { title: "#", rowSpan: 2, dataIndex: 0, alignCenter: true, width: 50 },
  date: {
    title: "Päivämäärä",
    rowSpan: 2,
    dataIndex: 1,
    alignCenter: true,
    width: 125,
  },
  trackName: { title: "Rata", rowSpan: 2, dataIndex: 2 },
  laps: { title: "Kierrokset", colSpan: 2, alignCenter: true },
  qLaps: { title: "A", dataIndex: 3, alignCenter: true, width: 75 },
  raceLaps: { title: "K", dataIndex: 4, alignCenter: true, width: 75 },
  link: {
    title: "Tulokset",
    rowSpan: 2,
    dataIndex: 5,
    alignCenter: true,
    width: 100,
  },
};

const headersRow1 = ["#", "date", "trackName", "laps", "link"];
const headersRow2 = ["qLaps", "raceLaps"];

const headers = [headersRow1, headersRow2];

const getUpcomingEvents = (cal: ISeason[]) =>
  cal.filter(event => !event.isCompleted);
const getHistoricEvents = (cal: ISeason[]) =>
  cal.filter(event => event.isCompleted).reverse();

const CalendarContent = () => {
  const [{ calendar }] = useStateValue();
  const [activeCalendar, setActiveCalendar] = React.useState<ISeason[]>(
    calendar
  );
  const [selectedCal, setSelectedCal] = React.useState<SelectedCal>(
    SelectedCal.Tulevat
  );

  React.useEffect(() => {
    setActiveCalendar(getUpcomingEvents(calendar));
  }, [calendar]);

  const handleCalSelection = (type: SelectedCal) => {
    switch (type) {
      case SelectedCal.Tulevat:
        setActiveCalendar(getUpcomingEvents(calendar));
        setSelectedCal(SelectedCal.Tulevat);
        break;
      case SelectedCal.Menneet:
        setActiveCalendar(getHistoricEvents(calendar));
        setSelectedCal(SelectedCal.Menneet);
        break;
      default:
        break;
    }
  };

  const isLoading = calendar.length === 0;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Page>
      <CalendarSelector>
        <SelectionButton
          onClick={() => handleCalSelection(SelectedCal.Tulevat)}
          isActive={selectedCal === SelectedCal.Tulevat}
        >
          Tulevat
        </SelectionButton>
        |
        <SelectionButton
          onClick={() => handleCalSelection(SelectedCal.Menneet)}
          isActive={selectedCal === SelectedCal.Menneet}
        >
          Menneet
        </SelectionButton>
      </CalendarSelector>
      {activeCalendar.map(season => {
        const eventsWithPos = season.events.map((event, i) => ({
          ...event,
          "#": i + 1,
        }));
        return (
          <SectionContainer key={season.seasonId}>
            <HeaderH3>{season.seasonName}</HeaderH3>
            <Table
              data={eventsWithPos}
              headers={headers}
              headerMap={headerMap}
            />
          </SectionContainer>
        );
      })}
    </Page>
  );
};

export default CalendarContent;
