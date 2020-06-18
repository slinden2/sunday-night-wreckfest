import axios from "axios";
import config from "../../config";
import { dnsLookup } from "./steamUtils";
import { parseServerName } from "../helpers";
import { IWFServerDataRaw, IWFServerData } from "../../types";

// Get all SNW servers from the Steam API
export const getSNWServers = async () => {
  const res = await axios.get(
    `https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${config.STEAM_API_KEY}&limit=10000&filter=appid\\228380`
  );

  // All server data
  const wfServers = res.data.response.servers as IWFServerDataRaw[];

  if (!config.LABBE_DOMAIN) {
    throw new Error("Missing LABBE_DOMAIN env variable.");
  }

  // Get the current ip address of LaBBes domain
  const ipAddress = await dnsLookup(config.LABBE_DOMAIN);

  const snwServers: IWFServerData[] = wfServers
    // Filter LaBBe's servers by ip and specific ports.
    // He has also server not related to SNW under same ip.
    .filter(
      srv =>
        srv.addr.includes(ipAddress) &&
        config.WF_SERVER_PORT_ARRAY.includes(srv.gameport)
    )
    // Format the data as we need it
    .map(srv => ({
      name: parseServerName(srv.name),
      players: srv.players,
      maxPlayers: srv.max_players,
    }));

  return snwServers;
};

export default { getSNWServers };
