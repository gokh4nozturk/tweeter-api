import { mutationField, nonNull } from '@nexus/schema';
import bcrypt from 'bcryptjs';
import { createToken } from '../../../context';

export const Register = mutationField('register', {
  type: 'AuthenticationType',
  args: {
    email: nonNull('String'),
    password: nonNull('String'),
    name: nonNull('String'),
  },
  resolve: async (_, args, ctx) => {
    const hashedPassword = await bcrypt.hash(args.password, 10);

    const user = await ctx.prisma.user.create({
      data: {
        email: args.email,
        password: hashedPassword,
        name: args.name,
      },
    });

    return {
      token: createToken(user.id),
    };
  },
});

export const Login = mutationField('login', {
  type: 'AuthenticationType',
  args: {
    email: nonNull('String'),
    password: nonNull('String'),
  },
  resolve: async (_, args, ctx) => {
    const user = await ctx.prisma.user.findUnique({ where: { email: args.email } });
    if (!user) {
      throw new Error('user cannot found');
    }
    const passwordMatch = await bcrypt.compare(args.password, user.password);
    if (!passwordMatch) {
      throw new Error('password cannot match');
    }

    return {
      token: createToken(user.id),
    };
  },
});
