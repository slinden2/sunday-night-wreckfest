import React from "react";
import { useFetchData } from "./hooks";
import config from "./config";

const App = () => {
  const [{ data, loading, error }, invoke] = useFetchData(
    config.baseUrl + "/api/races"
  );

  React.useEffect(() => {
    const loadRaceCalendar = async () => {
      await invoke();
    };
    loadRaceCalendar();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  console.log(data);

  return <div>SNW</div>;
};

export default App;
