import axios from "axios";

import * as steamUtils from "./steamUtils";
import { getSNWServers } from "./steamService";
import { toPromise } from "../../utils/mockData";

jest.mock("axios");

describe("steamService", () => {
  beforeEach(() => {
    jest
      .spyOn(steamUtils, "dnsLookup")
      .mockImplementation(() => toPromise("192.168.1.10"));
    // eslint-disable-next-line
    // @ts-ignore
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          response: {
            servers: [
              {
                addr: "192.168.1.10",
                gameport: 33541,
                steamid: "string",
                name: "string",
                appid: 1,
                gamedir: "string",
                version: "string",
                product: "string",
                region: 1,
                players: 1,
                // eslint-disable-next-line @typescript-eslint/camelcase
                max_players: 1,
                bots: 1,
                map: "string",
                secure: true,
                dedicated: true,
                os: "string",
                gametype: "string",
              },
            ],
          },
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of servers", async () => {
    const servers = await getSNWServers();
    expect(servers).toEqual([{ name: "string", players: 1, maxPlayers: 1 }]);
  });
});
