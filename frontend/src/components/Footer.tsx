import React from "react";
import styled from "styled-components";

import whiteGrit from "../assets/whitegrit.png";
import blackGrit from "../assets/blackgrit.png";
import discord from "../assets/discord.png";
import config from "../config";
import { StyledLink } from "./styledElements";

const SFooter = styled.footer`
  background-color: ${props => props.theme.colors.yellow};
`;

const ColorContainer = styled.div`
  clip-path: polygon(0px 50px, 100% 0px, 100% 100%, 0% 100%);
  background-color: ${props => props.theme.colors.black};
`;

const GritContainer = styled.div`
  background-size: 500px;
  padding-top: 180px;
  padding-bottom: 80px;
  clip-path: polygon(0px 50px, 100% 0px, 100% 100%, 0% 100%);
  overflow: hidden;
  background: url(${whiteGrit}) center center / 700px repeat;
  text-align: center;
`;

const TextContainer = styled.div`
  display: inline-block;
  border-radius: 2px;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};

  h2,
  p {
    margin: 0;
  }

  img {
  }
`;

const BlackGritContainer = styled.div`
  background: url(${blackGrit}) center center / 700px repeat;
  padding: 4rem;
`;

const DiscordFlex = styled.span`
  display: inline-flex;
  align-items: center;
`;

const CopyrightLink = styled.a`
  text-decoration: underline;
  color: black;
`;

const Footer = () => {
  return (
    <SFooter>
      <ColorContainer>
        <GritContainer>
          <TextContainer>
            <BlackGritContainer>
              <h2>Kiinnostaako kilpailu?</h2>
              <p>
                Liity{" "}
                <DiscordFlex>
                  <StyledLink
                    href={config.discordLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {" "}
                    Discordiimme{" "}
                  </StyledLink>{" "}
                  <img src={discord} alt="Discord" width="24px" height="24px" />
                </DiscordFlex>{" "}
                ja kysy lisää!
              </p>
              <p style={{ marginTop: "2rem" }}>
                &copy;{" "}
                <CopyrightLink
                  href="https://github.com/slinden2"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  slinden2
                </CopyrightLink>
              </p>
            </BlackGritContainer>
          </TextContainer>
        </GritContainer>
      </ColorContainer>
    </SFooter>
  );
};

export default Footer;
