import * as dotenv from "dotenv";

dotenv.config();

export default {
  DATABASE_NAME: process.env.POSTGRES_DATABASE,
  DATABASE_USER: process.env.POSTGRES_USER,
  DATABASE_PASSWORD: process.env.POSTGRES_PASSWORD,
  __prod__: process.env.NODE_ENV === "production",
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  REDIS_SECRET: process.env.REDIS_SECRET
};
