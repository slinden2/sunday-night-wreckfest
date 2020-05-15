import app from "../app";
import supertest from "supertest";
import { standingsService } from "../services";
import { toPromise, getStandingsReturn } from "../utils/mockData";

const api = supertest(app);

describe("GET /api/standings", () => {
  let mockStandingsService: jest.SpyInstance;

  beforeAll(() => {
    mockStandingsService = jest
      .spyOn(standingsService, "getStandings")
      .mockImplementation(() => toPromise(getStandingsReturn));
  });

  afterAll(() => {
    mockStandingsService.mockRestore();
  });

  it("should return json", async () => {
    await api
      .get("/api/standings")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should call getStandings from standingsService", async () => {
    await api.get("/api/standings").expect(200);
    expect(mockStandingsService).toHaveBeenCalled();
  });

  it("should return 2 drivers", async () => {
    const res = await api.get("/api/standings");
    expect(res.body).toHaveLength(2);
  });

  it("should return the mockData", async () => {
    const res = await api.get("/api/standings");
    expect(res.body).toEqual(expect.arrayContaining(getStandingsReturn));
  });
});
