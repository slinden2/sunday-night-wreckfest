import React from "react";
import styled from "styled-components";
import createDOMPurify from "dompurify";
import { IRaceDetails, VideoService } from "../../types";
import {
  HeaderH3,
  Page,
  SectionContainer,
  styledLinkProps,
} from "../styledElements";
import RaceResults from "./RaceResults";
import WrittenRaceResults from "./WrittenRaceResults";

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

interface Props {
  data: IRaceDetails;
}

const RaceContent = ({ data }: Props) => {
  const DOMPurify = createDOMPurify(window);

  const trackText = data.trackName2 ? "1. rata" : "Rata";

  const qLapsText = data.trackName2
    ? "1. kilpailukierrokset"
    : "Aika-ajokierrokset";
  const raceLapsText = data.trackName2
    ? "2. kilpailukierrokset"
    : "Kilpailukierroset";

  return (
    <Page>
      <EventTable>
        <tbody>
          <tr>
            <th>Päivämäärä</th>
            <td>{data.date}</td>
          </tr>
          <tr>
            <th>{trackText}</th>
            <td>{data.trackName}</td>
          </tr>
          {data.trackName2 && (
            <tr>
              <th>2. rata</th>
              <td>{data.trackName2}</td>
            </tr>
          )}
          {data.qLaps > 0 && (
            <tr>
              <th>{qLapsText}</th>
              <td>{data.qLaps}</td>
            </tr>
          )}
          <tr>
            <th>{raceLapsText}</th>
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
      {data.writtenResults ? (
        <WrittenRaceResults data={data} />
      ) : (
        <RaceResults data={data} />
      )}
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
