import dotenv from "dotenv";
import { ServiceAccountCredentials } from "google-spreadsheet";

dotenv.config();

const ENV: string | undefined = process.env.NODE_ENV;
const PORT: number = Number(process.env.PORT) || 3001;

// ID of the Google sheet.
const GS_ID: string | undefined = process.env.GS_ID;

if (!GS_ID) {
  throw new Error("Missing environment var: GS_ID");
}

// Service account email provided by Google
const GS_SERVICE_ACCOUNT_EMAIL: string | undefined =
  process.env.GS_SERVICE_ACCOUNT_EMAIL;

// Google Sheets private key for accessing the "DB"
const GS_PRIVATE_KEY: string | undefined = process.env.GS_PRIVATE_KEY?.split(
  "\\n"
).join("\n");

if (!GS_SERVICE_ACCOUNT_EMAIL || !GS_PRIVATE_KEY) {
  throw new Error(
    "Missing environment var: GS_SERVICE_ACCOUNT_EMAIL or GS_PRIVATE_KEY"
  );
}

const GS_CREDENTIALS: ServiceAccountCredentials = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  client_email: GS_SERVICE_ACCOUNT_EMAIL,
  // eslint-disable-next-line @typescript-eslint/camelcase
  private_key: GS_PRIVATE_KEY,
};

// Hash needed to runs the standings update script by calling the API.
const STANDINGS_UPDATE_HASH: string | undefined =
  process.env.STANDINGS_UPDATE_HASH;

// Symbol with which rows related to a draw situtation are marked
// when checking draws in eventDetails sheet in snw-db.
const CHECK_DRAW_TEXT = "X";

const STEAM_API_KEY: string | undefined = process.env.STEAM_API_KEY;

// My personal Steam accounts ID. Not needed for anything atm.
const STEAM_ID: number | undefined = Number(process.env.STEAM_ID);

// This domain is used for a DNS lookup that checks the current
// IP address of LaBBe's servers as it may change.
const LABBE_DOMAIN: string | undefined = process.env.LABBE_DOMAIN;

// Ports that LaBBe uses for his SNW servers. Used for filtering the server list
// obtained from the Steam API.
const WF_SERVER_PORT_ARRAY: number[] = [33544, 33541, 33542, 33543];

// REDIS CONFIG
const REDIS_URL: string = process.env.REDIS_URL || "redis://127.0.0.1:6379";

export default {
  ENV,
  PORT,
  GS_ID,
  GS_CREDENTIALS,
  STANDINGS_UPDATE_HASH,
  CHECK_DRAW_TEXT,
  STEAM_API_KEY,
  STEAM_ID,
  LABBE_DOMAIN,
  WF_SERVER_PORT_ARRAY,
  REDIS_URL,
};
