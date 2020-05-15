import React from "react";
import { useFetchData } from "../../hooks";
import config from "../../config";
import { IRaceCalendarEvent, ISeason } from "../../types";
import PageContainer from "../PageContainer";
import CalendarContent from "./CalendarContent";
import { calendarToSeasons } from "../../utils";

const raceCalendarUrl = config.baseUrl + "/races";

const CalendarContainer = () => {
  const [calendar, invoke] = useFetchData(raceCalendarUrl);
  const { data, loading } = calendar;

  React.useEffect(() => {
    const loadRaceCalendar = async () => {
      await invoke();
    };
    loadRaceCalendar();
  }, [invoke]);

  let seasons: ISeason[] = [];
  if (!loading && data) {
    seasons = calendarToSeasons(data as IRaceCalendarEvent[]);
  }

  return (
    <PageContainer title="Kisakalenteri">
      <CalendarContent seasons={seasons} loading={loading} />
    </PageContainer>
  );
};

export default CalendarContainer;
