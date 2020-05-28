import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/logo.svg";
import blackGrit from "../assets/blackgrit.png";

const Container = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;

  ${props => props.theme.media.desktop} {
    border-image-source: url(${blackGrit});
    border-image-slice: 200;
    border-image-repeat: round;
    border-width: var(--borderSize);
    border-style: solid solid none solid;
  }
`;

const Logo = styled.img`
  margin-top: var(--borderSize);
  display: inline-block;
  width: 250px;
`;

const Header = () => {
  return (
    <Container>
      <Link to="/">
        <Logo src={logo} alt="Sunday Night Wreckfest" />
      </Link>
    </Container>
  );
};

export default Header;
