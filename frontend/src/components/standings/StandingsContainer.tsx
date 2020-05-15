import React from "react";
import { useFetchData } from "../../hooks";
import config from "../../config";

import PageContainer from "../PageContainer";
import StandingsContent from "./StandingsContent";
import { IStandingRow } from "../../types";
import Dropdown from "../Dropdown";
import LoadingIndicator from "../LoadingIndicator";

const standingsUrl = config.baseUrl + "/standings";

export type Options = {
  value: string;
  content: string;
};

export type StandingsHash = {
  seasonId: string;
  seasonName: string;
};

const getOptions = (standings: IStandingRow[]): Options[] => {
  const options: Options[] = [];

  for (const row of standings) {
    if (options.some(opt => row.seasonId === opt.value)) {
      continue;
    } else {
      options.push({ value: row.seasonId, content: row.seasonName });
    }
  }

  return options;
};

const StandingsContainer = () => {
  const [data, invoke] = useFetchData(standingsUrl);
  const [selected, setSelected] = React.useState<string>("0400");
  const { data: temp, loading } = data;
  const standings = temp as IStandingRow[];

  React.useEffect(() => {
    const loadStandings = async () => {
      await invoke();
    };
    loadStandings();
  }, [invoke]);

  if (loading || !standings) {
    return <LoadingIndicator />;
  }

  const standingsToShow = standings.filter(row => row.seasonId === selected);

  return (
    <PageContainer title="Sarjataulukko">
      <Dropdown
        options={getOptions(standings)}
        selected={selected}
        setSelected={setSelected}
      />
      <StandingsContent standings={standingsToShow} />
    </PageContainer>
  );
};

export default StandingsContainer;
