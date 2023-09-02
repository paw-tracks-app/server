import { User } from '@prisma/client';
import UserService, { AuthUser } from './UserService';
import { BadRequestError, UnauthorizedError } from '../config/errors';
import { compareSync, hashSync } from 'bcryptjs';
import { omit } from 'lodash';

export type RegisterInput = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'password'
>;

export type LoginInput = Pick<User, 'email' | 'password'>;

const login = async ({ email, password }: LoginInput): Promise<AuthUser> => {
  const user = await UserService.findForLogin(email);

  const correctPassword = compareSync(password, user.password);

  if (!correctPassword) {
    throw new UnauthorizedError('Invalid email and password combination');
  }

  return omit(user, ['password']);
};

const register = async ({
  email,
  firstName,
  lastName,
  password,
}: RegisterInput): Promise<AuthUser> => {
  const emailTaken = await UserService.count({
    where: {
      email,
    },
  });

  if (emailTaken) {
    throw new BadRequestError('Email taken');
  }

  const hashedPassword = hashSync(password, 8);

  const user = await UserService.create({
    email,
    firstName,
    lastName,
    password: hashedPassword,
    role: 'USER',
  });

  return user;
};

export default {
  login,
  register,
};
