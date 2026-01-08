import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '@src/graphql/schema';
import resolvers from '@src/graphql/resolvers';
import { setContext } from '@src/graphql/context';

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: setContext,
  playground: {
    settings: {
      'request.credentials': 'include',
      'editor.theme': 'light',
    },
  },
});
