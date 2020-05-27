import { createGlobalStyle } from "styled-components";
import blackGrit from "../assets/blackgrit.png";

const GlobalStyle = createGlobalStyle`
  html {
    :root {
    --size: 40px;
    --borderSize: calc(var(--size) / 2);

    ${props => props.theme.media.tablet} {
      :root {
        --size: 20px;
      }
    }
    }

    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: var(--borderSize) solid ${props => props.theme.colors.black};
    font-size: 10px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    position: relative;
    color: ${props => props.theme.colors.black};
    min-height: 100vh;
    position: relative;

    ${props => props.theme.media.desktop} {  
      &:before {
        display: block;
        content: "";
        width: calc(100% - var(--size));
        height: calc(100% - var(--size));
        position: absolute;
        top: calc(var(--size) * 0.5);
        left: calc(var(--size) * 0.5);
        border-image-source: url(${blackGrit});
        border-image-slice: 200;
        border-image-outset: 1;
        border-image-repeat: round;
        border-width: var(--borderSize);
        border-style: solid;
        z-index: -1;
      }
    }
    
  }

  *, *:after, *:before {
    box-sizing: inherit;
  }

  body {
    font-size: 2rem;
    margin: var(--borderSize);
  }
`;

export default GlobalStyle;
