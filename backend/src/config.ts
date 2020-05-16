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

export default {
  ENV,
  PORT,
  GS_ID,
  GS_SERVICE_ACCOUNT_EMAIL,
  GS_PRIVATE_KEY,
};
