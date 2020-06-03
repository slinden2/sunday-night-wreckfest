import axios from "axios";
import config from "../../config";
import { dnsLookup } from "./steamUtils";
import { parseServerName } from "../helpers";
import { IWFServerDataRaw, IWFServerData } from "../../types";

export const getSNWServers = async () => {
  const res = await axios.get(
    `https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${config.STEAM_API_KEY}&limit=10000&filter=appid\\228380`
  );

  const wfServers = res.data.response.servers as IWFServerDataRaw[];

  if (!config.LABBE_DOMAIN) {
    throw new Error("Missing LABBE_DOMAIN env variable.");
  }

  const ipAddress = await dnsLookup(config.LABBE_DOMAIN);

  const snwServers: IWFServerData[] = wfServers
    .filter(
      srv =>
        srv.addr.includes(ipAddress) &&
        config.WF_SERVER_PORT_ARRAY.includes(srv.gameport)
    )
    .map(srv => ({
      name: parseServerName(srv.name),
      players: srv.players,
      maxPlayers: srv.max_players,
    }));

  return snwServers;
};

export default { getSNWServers };
