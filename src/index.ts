import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import config from "./config";
import { ApolloServer } from "apollo-server-express";
import { MyContext } from './types';
import { buildSchema } from "type-graphql";
import { CarAddResolver } from "./resolvers/carAdd";
import { UserResolver } from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()

  app.use(
    session({
      name: 'sess',
      store: new RedisStore({ 
        client: redisClient,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
        sameSite: 'lax', // protect against csrf (cross-site request forgery)
        secure: config.__prod__ // cookie only works in https
      },
      saveUninitialized: false,
      secret: "nmduiabnduianduia",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CarAddResolver, UserResolver],
      validate: false,
    }),
    context: ({req, res}): MyContext => ({ em: orm.em, req, res }),
  });
  

  apolloServer.applyMiddleware({ app });

  app.listen(config.SERVER_PORT, () => {
    console.log(`Server started on localhost:${config.SERVER_PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
