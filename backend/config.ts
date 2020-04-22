import dotenv from "dotenv";
dotenv.config();

const PORT: number | undefined = Number(process.env.PORT);

export { PORT };
