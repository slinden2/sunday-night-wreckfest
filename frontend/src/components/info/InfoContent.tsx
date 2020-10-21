/* 
Displays info data
*/

import React from "react";
import createDOMPurify from "dompurify";

import { Page } from "../styledElements";
import { Info } from "../../types";
import styled from "styled-components";

const InfoCard = styled.div`
  margin: 2rem auto;
  padding: 2rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 1px;
`;

interface Props {
  data: Info[];
}

const InfoContent = ({ data }: Props) => {
  const DOMPurify = createDOMPurify(window);

  return (
    <Page>
      {data.map((info) => (
        <InfoCard
          key={info.id}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(info.text),
          }}
        ></InfoCard>
      ))}
    </Page>
  );
};

export default InfoContent;

{
  /* <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data.description),
            }} */
}
