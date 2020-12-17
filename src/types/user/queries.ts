import { extendType, queryField } from '@nexus/schema';

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.user();
    t.crud.users();
  },
});

export const CurrentUser = queryField('currentUser', {
  type: 'User',
  resolve: async (_, __, ctx) => {
    if (!ctx.userId) {
      throw new Error('Not Authentication');
    }
    return ctx.prisma.user.findUnique({ where: { id: ctx.userId } });
  },
});
