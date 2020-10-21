/* 
Container component for info page

Handles data fetching and formatting and passes the formatted data to the
content component.
*/

import React from "react";
import config from "../../config";
import { setInfo } from "../../state";
import { useStateValue } from "../../state/state";
import { Info } from "../../types";
import ContentContainer from "../ContentContainer";
import InfoContent from "./InfoContent";

const infoUrl = config.baseUrl + "/info";

const InfoContainer = () => {
  const [{ info }, dispatch] = useStateValue();

  const isLoading = info.length === 0;

  // Fetch calendar data from api
  React.useEffect(() => {
    const loadInfo = async () => {
      try {
        const response = await fetch(infoUrl);
        const json = await response.json();

        dispatch(setInfo(json as Info[]));
      } catch (err) {
        console.error(err);
      }
    };
    if (isLoading) {
      loadInfo();
    }
  }, [dispatch, isLoading]);

  return (
    <ContentContainer title="Tiedotus">
      <InfoContent data={info} />
    </ContentContainer>
  );
};

export default InfoContainer;
