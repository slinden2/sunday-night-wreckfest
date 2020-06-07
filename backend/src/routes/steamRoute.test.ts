import supertest from "supertest";

import app from "../app";
import { steamService } from "../services";
import { toPromise } from "../utils/mockData";

const api = supertest(app);

describe("GET /api/servers", () => {
  beforeEach(() => {
    jest.spyOn(steamService, "getSNWServers").mockImplementation(() =>
      toPromise([
        {
          addr: "string",
          gameport: 1,
          steamid: "string",
          name: "string",
          appid: 1,
          gamedir: "string",
          version: "string",
          product: "string",
          region: 1,
          players: 1,
          maxPlayers: 1,
          bots: 1,
          map: "string",
          secure: true,
          dedicated: true,
          os: "string",
          gametype: "string",
        },
      ])
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return valid json", async () => {
    await api
      .get("/api/servers")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
