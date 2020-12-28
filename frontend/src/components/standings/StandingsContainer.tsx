/*
Container for standings

Handles data fetching and formatting and passed data to content component
*/

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

// Get season options for dropdown list (season selector dropdown)
const getOptions = (standings: IStandingRow[]): Options[] => {
  const options: Options[] = [];

  for (const row of standings) {
    if (options.some((opt) => row.seasonId === opt.value)) {
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

  const mostRecentSeason = standings[standings.length - 1].seasonId;
  if (!selected) {
    setSelected(mostRecentSeason);
  }

  const standingsToShow = standings.filter((row) => row.seasonId === selected);
  const teamObj = standingsToShow.reduce<Record<string, number>>((acc, cur) => {
    if (cur.teamName) {
      if (acc[cur.teamName]) {
        acc[cur.teamName] += cur.points;
      } else {
        acc[cur.teamName] = cur.points;
      }
    }
    return acc;
  }, {});

  const teamsToShow = Object.keys(teamObj)
    .map((key) => ({
      name: key,
      points: teamObj[key],
    }))
    .sort((a, b) => b.points - a.points)
    .map((team, i) => ({ ...team, "#": i + 1 }));

  return (
    <ContentContainer title="Sarjataulukko">
      <Dropdown
        options={getOptions(standings)}
        selected={selected}
        setSelected={setSelected}
      />
      <StandingsContent
        standings={standingsToShow}
        teamStandings={teamsToShow}
      />
    </ContentContainer>
  );
};

export default StandingsContainer;
