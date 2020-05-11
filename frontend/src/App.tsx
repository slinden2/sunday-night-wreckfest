import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import CalendarContainer from "./components/calendar/CalendarContainer";

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route path="/">
            <CalendarContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
