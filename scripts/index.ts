import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'Ozturk',
      email: 'ozturk@prisma.io',
      password: '12345ee',
      posts: {
        create: { title: 'Hello My World' },
      },
      profile: {
        create: { bio: 'I like coding' },
      },
    },
  });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });

  process.exit(0);
}

main();
