import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import config from 'config';
import { ImageAPI } from './data-sources/index';
import { typeDefs as RestaurantTypeDefs, resolvers as restaurantResolvers } from './graph-definitions/restaurant';

export const main = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs: [RestaurantTypeDefs],
    resolvers: restaurantResolvers,
    dataSources: () => ({
      imageAPI: new ImageAPI(
        `${config.get('services.image.protocol')}://${config.get('services.image.host')}:${config.get('services.image.port')}`
      ),
    })
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: config.get('server.port') }, () => console.info(
    `🚀 Server ready and listening at ==> http://localhost:${config.get('server.port')}${
      server.graphqlPath
    }`,
  ));
};

main().catch((error) => {
  console.error('Server failed to start', error);
});
