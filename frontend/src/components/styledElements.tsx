import styled from "styled-components";

export const HeaderH3 = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;

  ${props => props.theme.media.tablet} {
    font-size: 2rem;
  }
`;

export const SectionContainer = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
`;

export const Page = styled.div`
  margin-top: 5rem;
`;
