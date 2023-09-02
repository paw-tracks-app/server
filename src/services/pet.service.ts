import { Pet, PetToUser } from '../config/prisma';

type IPet = { id: number; name: string };

const create = async (name: string, userId: number) => {
  const createdPet = await Pet.create({
    data: {
      name,
      owners: {
        create: {
          userId,
          assignedBy: userId,
        },
      },
    },
  });

  return createdPet;
};

const mine = async (id: number): Promise<IPet[]> => {
  const myPets = await PetToUser.findMany({
    where: {
      userId: id,
    },
    include: {
      pet: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return myPets.map(pet => pet.pet);
};

export default {
  create,
  mine,
};
