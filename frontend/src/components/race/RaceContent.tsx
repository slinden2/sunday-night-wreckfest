import React from "react";
import styled from "styled-components";
import { IRaceDetails, VideoService, ITableHeaderMap } from "../../types";
import Table from "../Table";
import { convertTimeToSecs } from "../../utils";
import { HeaderH3, Page, SectionContainer } from "../styledElements";

const EventTable = styled.table`
  border: 2px solid black;
  border-collapse: collapse;
  text-align: left;

  ${props => props.theme.media.tablet} {
    font-size: 1.2rem;
  }

  td,
  th {
    border-bottom: 2px solid black;
    padding: 0.5rem 2rem 0.5rem 2rem;
  }

  th {
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
  }
`;

const VideoContainer = styled.div`
  ${props => props.theme.media.desktop} {
  }
`;

const VideoFrame = styled.div`
  padding-bottom: 56.25%;
  position: relative;
  margin-bottom: 1rem;

  @media (min-width: 1260px) {
    display: inline-block;
    width: 550px;
    height: 281px;
    position: static;
    padding: 0 1rem 0 1rem;
  }
`;

const IFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  @media (min-width: 1260px) {
    position: static;
    margin-bottom: 0;
  }
`;

const qHeaders = [["driverName", "qTime", "group"]];

const qHeaderMap: ITableHeaderMap = {
  driverName: { title: "Kuljettaja", dataIndex: 0 },
  qTime: { title: "Kierrosaika", dataIndex: 1, alignCenter: true },
  group: { title: "L", dataIndex: 2, alignCenter: true },
};

const raceHeaders = [
  ["driverName", "group", "seasonPoints", "heatPositions", "heatPoints"],
];

const raceHeaderMap: ITableHeaderMap = {
  driverName: { title: "Kuljettaja", dataIndex: 0 },
  seasonPoints: { title: "P", dataIndex: 1, alignCenter: true },
  group: { title: "L", dataIndex: 2, alignCenter: true },
  heatPositions: { title: "Lähtösijoitukset", dataIndex: 3, alignCenter: true },
  heatPoints: { title: "Lähtöpisteet", dataIndex: 4, alignCenter: true },
};

interface Props {
  data: IRaceDetails;
}

const RaceContent = ({ data }: Props) => {
  const qDetails = data.details.sort((a, b) => {
    const aTime = convertTimeToSecs(a.qTime);
    const bTime = convertTimeToSecs(b.qTime);
    return aTime - bTime;
  });

  const raceDetails = data.details
    .map(driver => ({
      ...driver,
      heatPoints: driver.heatPoints?.join(", "),
      heatPositions: driver.heatPositions?.join(", "),
    }))
    .sort((a, b) => b.seasonPoints - a.seasonPoints);

  return (
    <Page>
      <EventTable>
        <tbody>
          <tr>
            <th>Päivämäärä</th>
            <td>{data.date}</td>
          </tr>
          <tr>
            <th>Rata</th>
            <td>{data.trackName}</td>
          </tr>
          <tr>
            <th>Aika-ajokierrokset</th>
            <td>{data.qLaps}</td>
          </tr>
          <tr>
            <th>Kilpailukierrokset</th>
            <td>{data.raceLaps}</td>
          </tr>
          <tr>
            <th>Tehoraja</th>
            <td>{data.hasPowerLimit ? "X" : ""}</td>
          </tr>
        </tbody>
      </EventTable>
      <SectionContainer>
        <HeaderH3>Aika-ajotulokset</HeaderH3>
        <Table data={qDetails} headers={qHeaders} headerMap={qHeaderMap} />
      </SectionContainer>
      <SectionContainer>
        <HeaderH3>Kilpailutulokset</HeaderH3>
        <Table
          data={raceDetails}
          headers={raceHeaders}
          headerMap={raceHeaderMap}
        />
      </SectionContainer>
      {data.videos && (
        <SectionContainer>
          <HeaderH3>Media</HeaderH3>
          <VideoContainer>
            {data.videos.map(video => {
              if (video.service === VideoService.twitch) {
                return (
                  <VideoFrame>
                    <IFrame
                      key={video.id}
                      src={`https://player.twitch.tv/?autoplay=false&video=v${video.id}`}
                      title={video.id}
                      scrolling="no"
                      allowFullScreen
                    ></IFrame>
                  </VideoFrame>
                );
              } else {
                return (
                  <VideoFrame>
                    <IFrame
                      key={video.id}
                      title={video.id}
                      src={`https://www.youtube.com/embed/${video.id}`}
                      allowFullScreen
                    ></IFrame>
                  </VideoFrame>
                );
              }
            })}
          </VideoContainer>
        </SectionContainer>
      )}
    </Page>
  );
};

export default RaceContent;
