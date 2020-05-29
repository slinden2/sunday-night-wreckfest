import React from "react";
import styled from "styled-components";

import whiteGrit from "../assets/whitegrit.png";
import blackGrit from "../assets/blackgrit.png";

const Container = styled.div`
  text-align: center;
`;

const GritContainer = styled.div`
  margin-top: 5rem;
  font-size: 3rem;
  font-weight: 800;
  position: relative;
  margin-right: -2rem;
  background: url(${blackGrit}) 0% 0% / 600px;
  padding: 2rem;
  z-index: 1;
  display: inline-block;

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

const LoadingIndicator = () => {
  return (
    <Container>
      <GritContainer>
        <span>Loading...</span>
      </GritContainer>
    </Container>
  );
};

export default LoadingIndicator;
