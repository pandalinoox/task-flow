import { config } from "dotenv";

config();

const dotenvConfig = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
};

export default dotenvConfig;
