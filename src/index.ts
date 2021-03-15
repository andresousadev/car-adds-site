import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import config from "./config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { CarAddResolver } from "./resolvers/carAdd";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CarAddResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });
  

  apolloServer.applyMiddleware({ app });

  app.listen(config.SERVER_PORT, () => {
    console.log(`Server started on localhost:${config.SERVER_PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
