import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Container = styled.div`
  --negativeMargin: calc(var(--borderSize) * -1);
  background-color: ${props => props.theme.colors.white};
  margin: var(--negativeMargin) var(--negativeMargin) 0 var(--negativeMargin);
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    z-index: 1;
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
        <Logo src={logo} />
      </Link>
    </Container>
  );
};

export default Header;
