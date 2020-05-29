import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { INavItem } from "../types";
import whiteGrit from "../assets/whitegrit.png";
import blackGrit from "../assets/blackgrit.png";

const Container = styled.div`
  margin: 0 var(--borderSize);
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  padding: 3rem 2rem 2rem;
  box-shadow: rgba(0, 0, 0, 0.25) 1px -4px 4px;
  background-color: ${props => props.theme.colors.black};
  margin: 0 calc(var(--borderSize) * -1);
  border-bottom: 5px solid ${props => props.theme.colors.yellow};
`;

const NavListItem = styled.li<{ ignoreAfter: boolean }>`
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  align-content: center;
  gap: 2rem;

  a {
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    position: relative;

    &.active {
      &:before {
        display: block;
        content: "";
        width: 100%;
        height: 3px;
        position: absolute;
        top: 2em;
        background-color: ${props => props.theme.colors.yellow};

        ${props => props.theme.media.tablet} {
          height: 2px;
          top: 1.25em;
        }
      }
    }
  }

  ${props =>
    !props.ignoreAfter &&
    css`
      &::after {
        display: block;
        content: "+";
        font-size: 1.2em;
        color: ${props => props.theme.colors.yellow};
        transform: rotate(45deg);
        align-self: center;
      }
    `}
`;

const LinkSpan = styled.span`
  font-size: 3.2rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  position: relative;

  ${props => props.theme.media.tablet} {
    font-size: 1.7rem;
    font-weight: 800;
    letter-spacing: 0.1em;
  }
`;

const LinkText = styled.span`
  position: relative;
  margin-right: -2rem;
  background: url(${whiteGrit}) 0% 0% / 600px;
  padding: 2rem 2rem 2rem 0px;
  text-shadow: 2px 2px black;
  z-index: 1;

  &:hover {
    &::before {
      width: 0.75em;
      height: 0.75em;
      content: "";
      pointer-events: none;
      position: absolute;
      left: -0.25em;
      top: 0.75em;
      background-color: ${props => props.theme.colors.yellow};
      z-index: -1;

      ${props => props.theme.media.tablet} {
        left: -0.25em;
        top: 1.25em;
      }
    }
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
    background: url(${blackGrit}) center center / 700px repeat;
    background-repeat: repeat;
    background-position: center center;
    z-index: 2;
  }
`;

const navLinks: INavItem[] = [
  {
    title: "Kalenteri",
    url: "/",
  },
  {
    title: "Sarjataulukko",
    url: "/sarjataulukko",
  },
  {
    title: "Tiimit",
    url: "/tiimit",
  },
  {
    title: "Discord",
    url: "https://discord.gg/Xz3wa3",
    external: true,
  },
  {
    title: "SNW",
    url: "/snw",
  },
];

const lastLinkIndex = navLinks.length - 1;

const Navigation = () => {
  return (
    <Container>
      <NavList>
        {navLinks.map((link, i) => (
          <NavListItem key={link.title} ignoreAfter={i === lastLinkIndex}>
            {link.external ? (
              <a href={link.url} rel="_blank">
                <LinkSpan>
                  <LinkText>{link.title}</LinkText>
                </LinkSpan>
              </a>
            ) : (
              <NavLink exact to={link.url}>
                <LinkSpan>
                  <LinkText>{link.title}</LinkText>
                </LinkSpan>
              </NavLink>
            )}
          </NavListItem>
        ))}
      </NavList>
    </Container>
  );
};

export default Navigation;
