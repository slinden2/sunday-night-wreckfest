import React from "react";
import { useFetchData } from "../../hooks";
import config from "../../config";
import { IRaceCalendarEvent } from "../../types";
import PageContainer from "../PageContainer";
import CalendarContent from "./CalendarContent";

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

  return (
    <PageContainer title="Kisakalenteri">
      <CalendarContent
        events={data as IRaceCalendarEvent[]}
        loading={loading}
      />
    </PageContainer>
  );
};

export default CalendarContainer;
