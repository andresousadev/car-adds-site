import { MikroORM } from "@mikro-orm/core";
import config from "./config";
import { CarAdd } from "./entities/CarAdd";
import path from "path";
import { User } from "./entities/User";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [CarAdd, User],
  dbName: config.DATABASE_NAME,
  user: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  type: "postgresql",
  debug: !config.__prod__,
} as Parameters<typeof MikroORM.init>[0];
