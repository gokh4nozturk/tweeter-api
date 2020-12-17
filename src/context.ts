import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId?: string;
}

interface SignedToken {
  id: string;
}

export const createToken = (id: string): string => {
  return jwt.sign(
    {
      id,
    } as SignedToken,
    process.env.SECRET
  );
};

export const context = ({ req }: any) => {
  const { authorization = '' } = req.headers;
  const token = authorization.replace('Bearer ', '');

  let userId = '';

  if (authorization) {
    const { id } = jwt.verify(token, process.env.SECRET) as SignedToken;

    userId = id;
  }

  return {
    prisma,
    userId,
  };
};
