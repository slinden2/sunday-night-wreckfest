import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/logo_optimized.svg";
import blackGrit from "../assets/blackgrit.png";
import { IWFServerData } from "../types";

const Container = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  position: relative;

  ${props => props.theme.media.desktop} {
    border-image-source: url(${blackGrit});
    border-image-slice: 200;
    border-image-repeat: round;
    border-width: var(--borderSize);
    border-style: solid solid none solid;
  }

  ${props => props.theme.media.customMax(1020)} {
    flex-direction: column;
  }
`;

const Logo = styled.img`
  margin-top: var(--borderSize);
  display: inline-block;
  width: 250px;
`;

const ServerContainer = styled.table`
  font-size: 1.2rem;
  font-weight: 600;

  thead th:first-child {
    text-align: left;
  }

  tbody td:nth-child(2),
  thead th:nth-child(2) {
    text-align: center;
  }

  ${props => props.theme.media.customMin(1020)} {
    position: absolute;
    right: 0;
    bottom: 1rem;
  }

  ${props => props.theme.media.customMax(1020)} {
    margin-bottom: 1rem;
  }

  ${props => props.theme.media.customMax(400)} {
    font-size: 1rem;
  }
`;

interface Props {
  servers: IWFServerData[];
}

const Header = ({ servers }: Props) => {
  return (
    <Container>
      <Link to="/">
        <Logo src={logo} alt="Sunday Night Wreckfest" />
      </Link>
      {servers.length > 0 && (
        <ServerContainer>
          <thead>
            <tr>
              <th>Aktiiviset serverit</th>
              <th colSpan={2}>Pelaajat</th>
            </tr>
          </thead>
          <tbody>
            {servers.map(srv => (
              <tr key={srv.name}>
                <td>{srv.name}</td>
                <td>{`${srv.players}/${srv.maxPlayers}`}</td>
              </tr>
            ))}
          </tbody>
        </ServerContainer>
      )}
    </Container>
  );
};

export default Header;
