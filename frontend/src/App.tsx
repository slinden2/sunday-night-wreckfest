import React from "react";
import { useFetchData } from "./hooks";
import config from "./config";

const raceCalendarUrl = config.baseUrl + "/api/races";

const App = () => {
  const [{ data, loading, error }, invoke] = useFetchData(raceCalendarUrl);

  React.useEffect(() => {
    const loadRaceCalendar = async () => {
      await invoke();
    };
    loadRaceCalendar();
  }, [invoke]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  console.log("data", data);

  return <div>SNW</div>;
};

export default App;
