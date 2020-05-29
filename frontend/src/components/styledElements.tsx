import styled, { css } from "styled-components";

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

export const styledLinkProps = css`
  text-decoration: underline;
  color: inherit;
  display: inline-block;
  position: relative;

  &::before {
    display: block;
    content: "";
    width: 100%;
    height: 4px;
    background-color: ${props => props.theme.colors.yellow};
    position: absolute;
    bottom: -2px;
    transform: rotate(1.6deg);
  }

  &:hover::before {
    transform: scaleX(1.1) rotate(1.6deg);
  }
`;

export const StyledLink = styled.a`
  ${styledLinkProps}
`;
