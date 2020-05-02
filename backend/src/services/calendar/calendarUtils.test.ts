import { toRaceCalendarEvents } from "./calendarUtils";
import {
  toRaceCalendarEventsInput,
  toRaceCalendarEventsReturn,
} from "../../utils/mockData";

describe("calendarUtils", () => {
  describe("toRaceCalendarEvents", () => {
    it("Should convert 'any' type to RaceCalendarEvent[]", () => {
      toRaceCalendarEvents(toRaceCalendarEventsInput).forEach((race, i) => {
        expect(race).toEqual(
          expect.objectContaining(toRaceCalendarEventsReturn[i])
        );
      });
    });
  });
});
