import React from "react";
import { useFetchData } from "../../hooks";
import config from "../../config";

import PageContainer from "../PageContainer";
import StandingsContent from "./StandingsContent";
import { IStandingRow } from "../../types";

const standingsUrl = config.baseUrl + "/standings";

const CalendarContainer = () => {
  const [standings, invoke] = useFetchData(standingsUrl);
  const { data, loading } = standings;

  React.useEffect(() => {
    const loadStandings = async () => {
      await invoke();
    };
    loadStandings();
  }, [invoke]);

  return (
    <PageContainer title="Sarjataulukko">
      <StandingsContent standings={data as IStandingRow[]} loading={loading} />
    </PageContainer>
  );
};

export default CalendarContainer;
