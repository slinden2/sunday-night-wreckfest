import app from "../app";
import supertest from "supertest";
import { googleSheetsService } from "../services";
import { RaceCalendarEvent } from "../services/getRaceCalendarUtils";

const api = supertest(app);

const mockData: RaceCalendarEvent[] = [
  {
    eventId: "0401",
    isReady: true,
    isCompleted: true,
    date: "20200101",
    trackName: "Test Track",
    qLaps: 5,
    raceLaps: 4,
  },
  {
    eventId: "0402",
    isReady: true,
    isCompleted: true,
    date: "20200101",
    trackName: "Test Track",
    qLaps: 5,
    raceLaps: 4,
  },
];

describe("GET /api/races", () => {
  let mockGoogleSheetService: jest.SpyInstance;

  beforeAll(() => {
    mockGoogleSheetService = jest
      .spyOn(googleSheetsService, "getRaceCalendar")
      .mockImplementation(
        () =>
          new Promise((resolve, _reject) => {
            resolve(mockData);
          })
      );
  });

  afterAll(() => {
    mockGoogleSheetService.mockRestore();
  });

  it("should return json", async () => {
    await api
      .get("/api/races")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  it("calls getRaceCalendar from googleSheetService", async () => {
    await api.get("/api/races").expect(200);
    expect(mockGoogleSheetService).toHaveBeenCalled;
  });
  it("should return 2 races", async () => {
    const res = await api.get("/api/races");
    expect(res.body).toHaveLength(2);
  });
  it("should return the mockData", async () => {
    const res = await api.get("/api/races");
    expect(res.body).toEqual(expect.arrayContaining(mockData));
  });
});
