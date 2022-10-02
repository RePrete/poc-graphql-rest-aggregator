import { gql } from 'apollo-server-express';
const aggregator = require('graphql-rest-aggregator');


export const typeDefs = gql`
  type Restaurant {
    id: ID
    name: String
    country: Country
    owner: Owner
  }

  type Country {
    name: String!
    country_code: String!
  }
  
  type Owner {
    name: String!
  }

  type Query {
    restaurants: [Restaurant]
  }
`;

export const resolvers = {
  Query: {
    restaurants: async (_parent: any, _args: any, context: any, _info: any) => {
      const restaurants = (await context.dataSources.imageAPI.getRestaurants()).result
      context.countriesInRestaurants = [
          ...new Set(
            restaurants.map((restaurant: { country_code: any; }) => restaurant.country_code)
          )
      ]

      return restaurants
    }
  },
  ...aggregator.getQueries()
};
