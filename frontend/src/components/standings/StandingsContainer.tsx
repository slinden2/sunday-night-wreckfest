import React from "react";
import config from "../../config";
import { setStandings, useStateValue } from "../../state";

import ContentContainer from "../ContentContainer";
import StandingsContent from "./StandingsContent";
import { IStandingRow } from "../../types";
import Dropdown from "../Dropdown";
import LoadingIndicator from "../LoadingIndicator";

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
  const [{ standings }, dispatch] = useStateValue();
  const isLoading = standings.length === 0;
  const [selected, setSelected] = React.useState<string>("");

  React.useEffect(() => {
    const standingsUrl = config.baseUrl + "/standings";
    const loadStandings = async () => {
      try {
        const response = await fetch(standingsUrl);
        const json = await response.json();
        // Show the latest series standings by default
        setSelected(json[json.length - 1].seasonId);
        dispatch(setStandings(json));
      } catch (err) {
        console.error(err);
      }
    };
    if (isLoading) {
      loadStandings();
    }
  }, [dispatch, isLoading]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const standingsToShow = standings.filter(row => row.seasonId === selected);

  return (
    <ContentContainer title="Sarjataulukko">
      <Dropdown
        options={getOptions(standings)}
        selected={selected}
        setSelected={setSelected}
      />
      <StandingsContent standings={standingsToShow} />
    </ContentContainer>
  );
};

export default StandingsContainer;
