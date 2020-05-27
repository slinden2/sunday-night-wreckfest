import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Navigation from "./components/Navigation";
import CalendarContainer from "./components/calendar/CalendarContainer";
import StandingsContainer from "./components/standings/StandingsContainer";
import SNWContainer from "./components/snw/SNWContainer";
import RaceContainer from "./components/race/RaceContainer";
import config from "./config";
import Header from "./components/Header";
import blackGrit from "./assets/blackgrit.png";

const MainContainer = styled.div`
  border: var(--borderSize) solid ${props => props.theme.colors.black};
  position: relative;
  color: ${props => props.theme.colors.black};
  min-height: 100vh;

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
`;

const App = () => {
  return (
    <Router>
      <MainContainer>
        <Header />
        <Navigation />
        <Switch>
          <Route exact path="/">
            <CalendarContainer />
          </Route>
          <Route path={config.getRaceUrl(":id")}>
            <RaceContainer />
          </Route>
          <Route path="/standings">
            <StandingsContainer />
          </Route>
          <Route path="/snw">
            <SNWContainer />
          </Route>
        </Switch>
      </MainContainer>
    </Router>
  );
};

export default App;
