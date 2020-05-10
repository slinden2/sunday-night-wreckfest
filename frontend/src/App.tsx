import React from "react";
import Navigation from "./components/Navigation";
import CalendarContainer from "./components/calendar/CalendarContainer";

const App = () => {
  return (
    <div>
      <Navigation />
      <CalendarContainer />
    </div>
  );
};

export default App;
