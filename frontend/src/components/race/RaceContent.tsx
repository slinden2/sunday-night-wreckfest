import React from "react";
import styled from "styled-components";
import createDOMPurify from "dompurify";
import { IRaceDetails, VideoService, ITableHeaderMap } from "../../types";
import Table from "../Table";
import { convertTimeToSecs } from "../../utils";
import {
  HeaderH3,
  Page,
  SectionContainer,
  styledLinkProps,
} from "../styledElements";

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

  a {
    ${styledLinkProps}
    margin-right: 0.5rem;
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

const RaceContent = ({ data }: Props) => {
  const qDetails = data.details
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
    .sort((a, b) => b.seasonPoints - a.seasonPoints)
    .map((driver, i) => ({ ...driver, "#": i + 1 }));

  const DOMPurify = createDOMPurify(window);

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
          {data.cars && (
            <tr>
              <th>Autot</th>
              <td>{data.cars.join(", ")}</td>
            </tr>
          )}
          {data.hasPowerLimit && (
            <tr>
              <th>Tehoraja</th>
              <td>X</td>
            </tr>
          )}
          {data.mods && (
            <tr>
              <th>Modit</th>
              <td>
                {data.mods.map(mod => (
                  <a
                    key={mod.name}
                    target="_black"
                    rel="noopener noreferrer"
                    href={mod.url}
                  >
                    <span>{mod.name}</span>
                  </a>
                ))}
              </td>
            </tr>
          )}
        </tbody>
      </EventTable>
      {data.description && (
        <SectionContainer>
          <HeaderH3>Kuvaus</HeaderH3>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data.description),
            }}
          />
        </SectionContainer>
      )}
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
              } else if (video.service === VideoService.twitchClip) {
                return (
                  <VideoFrame>
                    <IFrame
                      key={video.id}
                      src={`https://clips.twitch.tv/embed?clip=${video.id}&parent=streamernews.example.com`}
                      title={video.id}
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
