import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import CalendarContainer from "./components/calendar/CalendarContainer";
import StandingsContainer from "./components/standings/StandingsContainer";
import SNWContainer from "./components/snw/SNWContainer";
import RaceContainer from "./components/race/RaceContainer";
import config from "./config";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <div>
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
      </div>
    </Router>
  );
};

export default App;
