import React from "react";
import createDOMPurify from "dompurify";

import { IRaceDetails } from "../../types";
import { Page, SectionContainer, HeaderH3 } from "../styledElements";
import RaceResults from "./RaceResults";
import WrittenRaceResults from "./WrittenRaceResults";
import VideoSection from "./VideoSection";
import RaceMeta from "./RaceMetaTable";

interface Props {
  data: IRaceDetails;
}

const RaceContent = ({ data }: Props) => {
  const DOMPurify = createDOMPurify(window);

  return (
    <Page>
      <RaceMeta data={data} />
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
      <VideoSection data={data} />
    </Page>
  );
};

export default RaceContent;
