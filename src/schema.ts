import { declarativeWrappingPlugin, makeSchema } from '@nexus/schema';
import { nexusPrisma } from 'nexus-plugin-prisma';

import * as types from './types';

const schema = makeSchema({
  types,
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: require.resolve('.prisma/client/index.d.ts'),
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
  outputs: {
    schema: `${__dirname}/generated/schema.graphql`,
    typegen: `${__dirname}/generated/nexus.ts`,
  },
  shouldGenerateArtifacts: true,
  plugins: [declarativeWrappingPlugin(), nexusPrisma({ experimentalCRUD: true })],
});

export default schema;
