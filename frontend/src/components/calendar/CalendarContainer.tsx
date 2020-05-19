import React from "react";
import config from "../../config";
import { IRaceCalendarEvent } from "../../types";
import PageContainer from "../PageContainer";
import CalendarContent from "./CalendarContent";
import { Link } from "react-router-dom";
import { useStateValue, setCalendar } from "../../state";

const raceCalendarUrl = config.baseUrl + "/races";

const CalendarContainer = () => {
  const [{ calendar }, dispatch] = useStateValue();
  const isLoading = calendar.length === 0;

  // Fetch calendar data from api
  React.useEffect(() => {
    const loadRaceCalendar = async () => {
      try {
        const response = await fetch(raceCalendarUrl);
        const json = await response.json();
        const dataWithLinks = json.map((event: IRaceCalendarEvent) => ({
          ...event,
          link: <Link to={config.getRaceUrl(event.eventId)}>Link</Link>,
        })) as IRaceCalendarEvent[];
        dispatch(setCalendar(dataWithLinks));
      } catch (err) {
        console.error(err);
      }
    };
    if (isLoading) {
      loadRaceCalendar();
    }
  }, [dispatch, isLoading]);

  return (
    <PageContainer title="Kisakalenteri">
      <CalendarContent />
    </PageContainer>
  );
};

export default CalendarContainer;
