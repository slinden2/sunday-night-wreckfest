/* 
Container for videos displayed on the race pages
*/

import React from "react";
import styled from "styled-components";
import { SectionContainer, HeaderH3 } from "../styledElements";
import { IRaceDetails } from "../../types";
import VideoFrame from "./VideoFrame";

const VideoContainer = styled.div`
  ${props => props.theme.media.desktop} {
  }
`;

interface Props {
  data: IRaceDetails;
}

const VideoSection = ({ data }: Props) => {
  return (
    <div>
      {data.videos && (
        <SectionContainer>
          <HeaderH3>Media</HeaderH3>
          <VideoContainer>
            {data.videos.map(video => (
              <VideoFrame key={video.id} video={video} />
            ))}
          </VideoContainer>
        </SectionContainer>
      )}
    </div>
  );
};

export default VideoSection;
