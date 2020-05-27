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
  color: ${props => props.theme.colors.black};
  min-height: 100vh;
`;

const PageContainer = styled.div`
  background-color: ${props => props.theme.colors.yellow};
  height: 100vh;
  padding-bottom: 4rem;
  border-image-source: url(${blackGrit});
  border-image-slice: 200;
  border-image-repeat: round;
  border-width: var(--borderSize);
  border-style: none solid solid solid;
`;

const App = () => {
  return (
    <Router>
      <MainContainer>
        <Header />
        <Navigation />
        <PageContainer>
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
        </PageContainer>
      </MainContainer>
    </Router>
  );
};

export default App;
