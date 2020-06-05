import React from "react";
import createDOMPurify from "dompurify";

import { IRaceDetails } from "../../types";
import { SectionContainer, HeaderH3 } from "../styledElements";

interface Props {
  data: IRaceDetails;
}

const WrittenRaceResults = ({ data }: Props) => {
  if (!data.writtenResults) return null;

  const DOMPurify = createDOMPurify(window);

  return (
    <div>
      <SectionContainer>
        <HeaderH3>Tulokset</HeaderH3>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.writtenResults),
          }}
        />
      </SectionContainer>
    </div>
  );
};

export default WrittenRaceResults;
