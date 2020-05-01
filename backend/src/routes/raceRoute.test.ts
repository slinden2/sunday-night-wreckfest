import app from "../app";
import supertest from "supertest";
import { googleSheetsService } from "../services";
import { toPromise, getRaceCalendarReturn } from "../utils/mockData";

const api = supertest(app);

describe("GET /api/races", () => {
  let mockGoogleSheetService: jest.SpyInstance;

  beforeAll(() => {
    mockGoogleSheetService = jest
      .spyOn(googleSheetsService, "getRaceCalendar")
      .mockImplementation(() => toPromise(getRaceCalendarReturn));
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
    expect(res.body).toEqual(expect.arrayContaining(getRaceCalendarReturn));
  });
});
