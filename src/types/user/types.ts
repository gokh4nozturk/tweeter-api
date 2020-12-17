import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.password();
    t.model.profile();
    t.model.posts();
  },
});

export const AuthenticationType = objectType({
  name: 'AuthenticationType',
  definition(t) {
    t.nonNull.string('token');
  },
});
