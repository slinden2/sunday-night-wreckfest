import dotenv from "dotenv";

dotenv.config();

const ENV: string | undefined = process.env.NODE_ENV;
const PORT: number = Number(process.env.PORT) || 3001;
const GS_ID: string | undefined = process.env.GS_ID;
const GS_SERVICE_ACCOUNT_EMAIL: string | undefined =
  process.env.GS_SERVICE_ACCOUNT_EMAIL;
const GS_PRIVATE_KEY: string | undefined = process.env.GS_PRIVATE_KEY?.split(
  "\\n"
).join("\n");
const STANDINGS_UPDATE_HASH: string | undefined =
  process.env.STANDINGS_UPDATE_HASH;
const CHECK_DRAW_TEXT = "X";

const STEAM_API_KEY: string | undefined = process.env.STEAM_API_KEY;
const STEAM_ID: number | undefined = Number(process.env.STEAM_ID);
const LABBE_DOMAIN: string | undefined = process.env.LABBE_DOMAIN;
const WF_SERVER_PORT_ARRAY: number[] = [33544, 33541, 33542, 33543];

export default {
  ENV,
  PORT,
  GS_ID,
  GS_SERVICE_ACCOUNT_EMAIL,
  GS_PRIVATE_KEY,
  STANDINGS_UPDATE_HASH,
  CHECK_DRAW_TEXT,
  STEAM_API_KEY,
  STEAM_ID,
  LABBE_DOMAIN,
  WF_SERVER_PORT_ARRAY,
};
