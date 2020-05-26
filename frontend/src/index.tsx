import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StateProvider } from "./state/state";
import { reducer } from "./state/reducer";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer}>
      <GlobalStyle theme={theme} />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
