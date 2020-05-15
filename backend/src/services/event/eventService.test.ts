import { eventService } from "..";
import {
  getRaceCalendarReturn,
  getRaceDataReturn,
  mergeRaceDataReturn,
} from "../../utils/mockData";

describe("eventService", () => {
  describe("mergeRaceData", () => {
    it("should return merge data correctly", () => {
      expect(
        eventService.mergeRaceData(
          "0401",
          getRaceCalendarReturn,
          getRaceDataReturn
        )
      ).toEqual(mergeRaceDataReturn);
    });
    it("should throw with inexisting eventId", () => {
      expect(() =>
        eventService.mergeRaceData(
          "0405",
          getRaceCalendarReturn,
          getRaceDataReturn
        )
      ).toThrow(/No races found/);
    });
  });
});
