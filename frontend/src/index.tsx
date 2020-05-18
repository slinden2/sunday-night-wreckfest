import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StateProvider } from "./state/state";
import { reducer } from "./state/reducer";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
