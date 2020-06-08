import React from "react";
import styled from "styled-components";
import blackGrit from "../assets/blackgrit.png";
import whiteGrit from "../assets/whitegrit.png";
import { useDocTitle } from "../hooks";

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  min-height: 100%;
  margin: 0 auto;
  padding: 4rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: 2px;
  z-index: 1000;

  ${props => props.theme.media.tablet} {
    padding: 2rem;
  }
`;

const Title = styled.h2`
  margin: 0 0 0.5em 0;
  font-size: 5rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  position: relative;

  ${props => props.theme.media.tablet} {
    font-size: 3rem;
  }

  span {
    padding: 2rem 2rem 2rem 0px;
    background: url(${blackGrit}) 0% 0% / 600px;
    position: relative;
  }

  &::before {
    width: 0.75em;
    height: 0.75em;
    content: "";
    pointer-events: none;
    position: absolute;
    left: -0.25em;
    top: 0.1em;
    z-index: 0;
    pointer-events: none;
    background-color: ${props => props.theme.colors.yellow};
  }

  &::after {
    position: absolute;
    z-index: 2;
    content: "";
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    pointer-events: none;
    background: url(${whiteGrit}) center center / 700px repeat;
    background-repeat: repeat;
    background-position: center center;
    z-index: 2;
  }
`;

interface Props {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

const ContentContainer: React.FC<Props> = ({ title, children }: Props) => {
  useDocTitle(title);

  return (
    <Container>
      <Title>
        <span>{title}</span>
      </Title>
      {children}
    </Container>
  );
};

export default ContentContainer;
