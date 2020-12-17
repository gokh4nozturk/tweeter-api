import { ApolloServer } from 'apollo-server';
import './generated/nexus';

import { context } from './context';
import schema from './schema';

const server = new ApolloServer({ schema, context });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
