import React from "react";
import { useFetchData } from "../../hooks";
import config from "../../config";
import { IRaceCalendarEvent } from "../../types";
import PageContainer from "../PageContainer";
import CalendarContent from "./CalendarContent";
import { Link } from "react-router-dom";
import { useStateValue, setCalendar } from "../../state";

const raceCalendarUrl = config.baseUrl + "/races";

const CalendarContainer = () => {
  const [response, invoke] = useFetchData(raceCalendarUrl);
  const [{ calendar }, dispatch] = useStateValue();

  // Fetch calendar data from api
  React.useEffect(() => {
    const loadRaceCalendar = async () => {
      try {
        await invoke();
      } catch (err) {
        console.error(err);
      }
    };
    if (!calendar.length) {
      loadRaceCalendar();
    }
  }, [invoke, calendar]);

  // Put calendar data in state
  React.useEffect(() => {
    if (response.data) {
      const dataWithLinks = response.data.map((event: IRaceCalendarEvent) => ({
        ...event,
        link: <Link to={config.getRaceUrl(event.eventId)}>Link</Link>,
      })) as IRaceCalendarEvent[];
      dispatch(setCalendar(dataWithLinks));
    }
  }, [response.data, dispatch]);

  return (
    <PageContainer title="Kisakalenteri">
      <CalendarContent seasons={calendar} loading={response.loading} />
    </PageContainer>
  );
};

export default CalendarContainer;
