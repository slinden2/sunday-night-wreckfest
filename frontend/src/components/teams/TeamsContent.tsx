import React from "react";
import styled from "styled-components";
import { Page } from "../styledElements";
import noTeamLogo from "../../assets/no-team-logo.svg";
import { useStateValue } from "../../state";
import LoadingIndicator from "../LoadingIndicator";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
`;

const Card = styled.div`
  margin: 1rem 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 550px;
  box-shadow: 2px 2px 3px #111111;
  border-radius: 2px;

  .img-container {
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.black};

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: scale-down;
    }
  }

  .meta-container {
    flex: 1 1 100px;
    padding: 2rem;
    text-align: center;
    p {
      margin: 0;
    }
  }
`;

const TeamsContent = () => {
  const [{ teams }] = useStateValue();

  return (
    <Page>
      {teams.length === 0 ? (
        <LoadingIndicator />
      ) : (
        <CardContainer>
          {teams.map(team => (
            <Card key={team.name}>
              <div className="img-container">
                <img
                  alt={`${team.name} logo`}
                  src={team.logoUrl ? team.logoUrl : noTeamLogo}
                />
              </div>
              <div className="meta-container">
                <h4>{team.name}</h4>

                <p>{team.driver1}</p>
                <p>{team.driver2}</p>
              </div>
            </Card>
          ))}
        </CardContainer>
      )}
    </Page>
  );
};

export default TeamsContent;
