import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Navigation from "./components/Navigation";
import CalendarContainer from "./components/calendar/CalendarContainer";
import StandingsContainer from "./components/standings/StandingsContainer";
import SNWContainer from "./components/snw/SNWContainer";
import RaceContainer from "./components/race/RaceContainer";
import config from "./config";
import Header from "./components/Header";
import blackGrit from "./assets/blackgrit.png";
import TeamsContainer from "./components/teams/TeamsContainer";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { IWFServerData } from "./types";
import InfoContainer from "./components/info/InfoContainer";

// Container that has a thick black border that wraps the whole site
const MainContainer = styled.div`
  border: var(--borderSize) solid ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.black};
  min-height: 100vh;
`;

// Container that wraps the content part of the site (excl. header, navi and footer)
const PageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.yellow};
  height: 100%;
  min-height: 70vh;
  padding-bottom: 4rem;

  ${(props) => props.theme.media.desktop} {
    border-image-source: url(${blackGrit});
    border-image-slice: 200;
    border-image-repeat: round;
    border-width: var(--borderSize);
    border-style: none solid none solid;
  }
`;

const getServersUrl = config.baseUrl + "/servers";

const App = () => {
  const [servers, setServers] = React.useState<IWFServerData[]>([]);

  React.useEffect(() => {
    const loadSNWServers = async () => {
      try {
        const response = await fetch(getServersUrl);
        const json = await response.json();
        const data = json.map((srv: IWFServerData) => ({
          ...srv,
        })) as IWFServerData[];
        setServers(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadSNWServers();
  }, []);

  return (
    <Router>
      <MainContainer>
        <Header servers={servers} />
        <Navigation />
        <PageContainer>
          <ScrollToTop />
          <Switch>
            <Route exact path="/">
              <InfoContainer />
            </Route>
            <Route path="/kalenteri">
              <CalendarContainer />
            </Route>
            <Route path={"/kilpailut/:id"}>
              <RaceContainer />
            </Route>
            <Route path="/sarjataulukko">
              <StandingsContainer />
            </Route>
            <Route path="/tiimit">
              <TeamsContainer />
            </Route>
            <Route path="/snw">
              <SNWContainer />
            </Route>
          </Switch>
        </PageContainer>
        <Footer />
      </MainContainer>
    </Router>
  );
};

export default App;
