import { PrismaClient } from '@prisma/client';
import env from './env';
import { LogDefinition } from '@prisma/client/runtime/library';

const prismaOptions: { log?: LogDefinition[] } = {
  ...(env.nodeEnv !== 'production' && {
    log: [
      { level: 'query', emit: 'stdout' },
      { level: 'info', emit: 'stdout' },
    ],
  }),
};

const prisma = new PrismaClient(prismaOptions);
console.log('ppprisma!');

export const User = prisma.user;
