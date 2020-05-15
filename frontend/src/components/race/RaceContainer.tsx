import React from "react";
import PageContainer from "../PageContainer";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../hooks";
import config from "../../config";
import LoadingIndicator from "../LoadingIndicator";
import RaceContent from "./RaceContent";
import { IRaceDetails } from "../../types";

const RaceContainer = () => {
  const { id } = useParams();
  const [{ data, loading }, invoke] = useFetchData(
    config.baseUrl + config.getRaceUrl(id)
  );
  const raceDetails = data as IRaceDetails;

  React.useEffect(() => {
    const loadRaceData = async () => {
      await invoke();
    };
    loadRaceData();
  }, [invoke]);

  if (loading || !data) {
    return <LoadingIndicator />;
  }
  return (
    <PageContainer
      title={`${raceDetails.seasonName} | ${raceDetails.trackName}`}
    >
      <RaceContent raceDetails={raceDetails} />
    </PageContainer>
  );
};

export default RaceContainer;
