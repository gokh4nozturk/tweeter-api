import { extendType } from '@nexus/schema';

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.user();
    t.crud.users();
  },
});
