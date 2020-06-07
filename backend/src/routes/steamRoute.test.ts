import supertest from "supertest";

import app from "../app";
import { steamService } from "../services";

const api = supertest(app);

describe("GET /api/servers", () => {
  beforeEach(() => {
    jest.spyOn(steamService, "getSNWServers").mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return valid json", async () => {
    await api.get("/api/standings").expect(200);
    // .expect("Content-Type", /application\/json/);
  });
});
