import React from "react";
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
          <li key={link.title}>{link.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
