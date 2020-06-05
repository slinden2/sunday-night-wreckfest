import app from "../app";
import supertest from "supertest";
import { calendarService, eventService } from "../services";
import {
  toPromise,
  getRaceCalendarReturn,
  getSeasonDataReturn,
  getRaceCalendarReturnWithWrittenRes,
} from "../utils/mockData";

const api = supertest(app);

describe("GET /api/races", () => {
  let calendarServiceSpy: jest.SpyInstance;

  beforeEach(() => {
    calendarServiceSpy = jest
      .spyOn(calendarService, "getRaceCalendar")
      .mockImplementation(() => toPromise(getRaceCalendarReturn));
  });

  afterEach(() => {
    calendarServiceSpy.mockRestore();
  });

  describe("GET /", () => {
    it("should return json", async () => {
      await api
        .get("/api/races")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
    it("calls getRaceCalendar from calendarService", async () => {
      await api.get("/api/races").expect(200);
      expect(calendarServiceSpy).toHaveBeenCalled();
    });
    it("should return 2 races", async () => {
      const res = await api.get("/api/races");
      expect(res.body).toHaveLength(2);
    });
    it("should return the mockData", async () => {
      const res = await api.get("/api/races");
      expect(res.body).toEqual(expect.arrayContaining(getRaceCalendarReturn));
    });
  });

  describe("GET /:id", () => {
    beforeEach(() => {
      jest
        .spyOn(eventService, "getSeasonData")
        .mockImplementation(() => toPromise(getSeasonDataReturn));

      jest.spyOn(eventService, "mergeRaceData").mockImplementation();

      jest.spyOn(eventService, "getRaceData").mockImplementation();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return json", async () => {
      await api
        .get("/api/races/0401")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    it("should return return json with written results", async () => {
      jest
        .spyOn(calendarService, "getRaceCalendar")
        .mockImplementation(() =>
          toPromise(getRaceCalendarReturnWithWrittenRes)
        );

      await api
        .get("/api/races/0401")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
  });
});
