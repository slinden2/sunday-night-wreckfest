import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Container = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
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
