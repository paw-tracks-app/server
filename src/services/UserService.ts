import type { Role, Prisma } from '@prisma/client';

import { User } from '../config/prisma';

import { BadRequestError, NotFoundError } from '../config/errors';

const DEFAULT_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
};

export type AuthUser = {
  id: number;
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
};

const count = async (args: Prisma.UserCountArgs) => {
  const amount = await User.count(args);
  return amount;
};

const create = async (user: Prisma.UserCreateArgs['data']) => {
  const newUser = await User.create({
    data: user,
    select: DEFAULT_SELECT,
  });

  if (!newUser) {
    throw new BadRequestError('Error creating user');
  }

  return newUser;
};

const findById = async (id: number): Promise<AuthUser> => {
  const user = await User.findUnique({
    where: {
      id,
    },
    select: DEFAULT_SELECT,
  });

  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`);
  }

  return user;
};

const findForLogin = async (email: string) => {
  const user = await User.findFirst({
    where: { email },
    select: { ...DEFAULT_SELECT, password: true },
  });

  if (!user) {
    throw new NotFoundError(`User with email ${email} not found`);
  }

  return user;
};

export default {
  count,
  create,

  findById,
  findForLogin,
};
