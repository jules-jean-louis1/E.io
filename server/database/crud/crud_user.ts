import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const createUser = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({ data });
}