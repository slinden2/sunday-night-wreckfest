import React from "react";
import ContentContainer from "../ContentContainer";
import { useParams } from "react-router-dom";
import config from "../../config";
import { setRaces } from "../../state";
import RaceContent from "./RaceContent";
import { useStateValue } from "../../state";
import LoadingIndicator from "../LoadingIndicator";

const RaceContainer = () => {
  const { id } = useParams();
  const [{ races }, dispatch] = useStateValue();
  const isLoading = !races.some(race => race.eventId === id);

  React.useEffect(() => {
    const raceUrl = config.baseUrl + config.getRaceUrl(id);
    const loadRaceData = async () => {
      try {
        const response = await fetch(raceUrl);
        const json = await response.json();
        dispatch(setRaces(json));
      } catch (err) {
        console.error(err);
      }
    };
    if (isLoading) {
      loadRaceData();
    }
  }, [id, dispatch, isLoading]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const race = races.find(race => race.eventId === id);

  if (!race) {
    throw new Error(`Race with raceId: ${id} does not exist!`);
  }

  return (
    <ContentContainer title={`${race.seasonName} | ${race.trackName}`}>
      <RaceContent data={race} />
    </ContentContainer>
  );
};

export default RaceContainer;
