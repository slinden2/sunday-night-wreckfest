import dotenv from "dotenv";
import GS_AUTH from "../google-sheets-credentials.json";

dotenv.config();

const PORT: number | undefined = Number(process.env.PORT);
const GS_ID: string | undefined = process.env.GS_ID;

export default { PORT, GS_AUTH, GS_ID };
