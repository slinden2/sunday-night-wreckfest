import { DefaultTheme } from "styled-components";

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

const customMinMediaQuery = (minWidth: number) =>
  `@media (min-width: ${minWidth}px)`;

const theme: DefaultTheme = {
  colors: {
    yellow: "#ffc600",
    cyan: "#091ffff",
    black: "#000000",
    white: "#ffffff",
    lightgrey: "#f0f0f0",
  },

  media: {
    customMin: customMinMediaQuery,
    customMax: customMediaQuery,
    desktop: customMinMediaQuery(922),
    tablet: customMediaQuery(768),
    phone: customMediaQuery(576),
  },
};

export { theme };
