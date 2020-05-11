import React from "react";
import { NavLink } from "react-router-dom";
import { INavItem } from "../types";

const navLinks: INavItem[] = [
  {
    title: "Kalenteri",
    url: "/",
  },
  {
    title: "Sarjataulukko",
    url: "/standings",
  },
  {
    title: "SNW",
    url: "/snw",
  },
];

const Navigation = () => {
  return (
    <div>
      <ul>
        {navLinks.map(link => (
          <li key={link.title}>
            <NavLink to={link.url}>{link.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
