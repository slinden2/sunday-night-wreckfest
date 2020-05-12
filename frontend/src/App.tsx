import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import CalendarContainer from "./components/calendar/CalendarContainer";
import StandingsContainer from "./components/standings/StandingsContainer";
import SNWContainer from "./components/snw/SNWContainer";

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <CalendarContainer />
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
