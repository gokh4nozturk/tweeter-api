import { extendType } from '@nexus/schema';

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUser();
    t.crud.updateOneUser();
  },
});
