import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: 'border-box'

  }

  *, *:after, *:before {
    box-sizing: inherit
  }

  body {
    background-color: ${props => props.theme.colors.yellow}
  }
`;

export default GlobalStyle;
