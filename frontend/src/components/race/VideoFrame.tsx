/* 
A frame component for a single video
*/

import React from "react";
import styled from "styled-components";
import { VideoType, VideoService } from "../../types";
import config from "../../config";

function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here: " + x);
}

const SVideoFrame = styled.div`
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
  video: VideoType;
}

const VideoFrame = ({ video }: Props) => {
  let videoUrl: string;

  const parentParam =
    config.ENV === "production"
      ? "&parent=sundaynightwreckfest.fi&parent=www.sundaynightwreckfest.fi"
      : "&parent=localhost";

  switch (video.service) {
    case VideoService.youtube:
      videoUrl = `https://www.youtube.com/embed/${video.id}`;
      break;
    case VideoService.tubelist:
      videoUrl = `https://www.youtube.com/embed/videoseries?list=${video.id}`;
      break;
    case VideoService.twitch:
      videoUrl = `https://player.twitch.tv/?autoplay=false&video=v${video.id}${parentParam}`;
      break;
    case VideoService.twitchClip:
      videoUrl = `https://clips.twitch.tv/embed?clip=${video.id}${parentParam}`;
      break;
    default:
      assertUnreachable(video.service);
  }

  return (
    <SVideoFrame>
      <IFrame
        key={video.id}
        src={videoUrl}
        title={video.id}
        scrolling="no"
        allowFullScreen
      ></IFrame>
    </SVideoFrame>
  );
};

export default VideoFrame;
