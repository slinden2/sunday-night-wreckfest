import React from "react";
import ContentContainer from "../ContentContainer";
import TeamsContent from "./TeamsContent";
import config from "../../config";
import { useStateValue, setTeams } from "../../state";

const TeamsContainer = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    const teamsUrl = config.baseUrl + "/teams";
    const loadTeamData = async () => {
      const response = await fetch(teamsUrl);
      const json = await response.json();
      dispatch(setTeams(json));
    };
    loadTeamData();
  }, [dispatch]);

  return (
    <ContentContainer title="Tiimit">
      <TeamsContent />
    </ContentContainer>
  );
};

export default TeamsContainer;
