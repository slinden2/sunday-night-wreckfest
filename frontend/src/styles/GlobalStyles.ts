import { createGlobalStyle } from "styled-components";

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

    font-size: 10px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    
  }

  *, *:after, *:before {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 2rem;
  }
`;

export default GlobalStyle;
