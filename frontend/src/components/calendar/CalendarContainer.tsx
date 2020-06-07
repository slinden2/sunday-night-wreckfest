import React from "react";
import config from "../../config";
import { IRaceCalendarEvent } from "../../types";
import ContentContainer from "../ContentContainer";
import CalendarContent from "./CalendarContent";
import { Link } from "react-router-dom";
import { useStateValue, setCalendar } from "../../state";
import { getFinnishDate } from "../../utils";

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
          link: <Link to={`/kilpailut/${event.eventId}`}>Linkki</Link>,
          date: getFinnishDate(event.date),
          ...(event.trackName2
            ? { trackName: `${event.trackName} / ${event.trackName2}` }
            : { trackName: event.trackName }),
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
    <ContentContainer title="Kisakalenteri">
      <CalendarContent />
    </ContentContainer>
  );
};

export default CalendarContainer;
