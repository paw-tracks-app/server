import { TrackType } from '@prisma/client';
import { Pet, PetToUser } from '../config/prisma';
import trackService from './track.service';

type PetTrack = {
  id: number;
  label: string;
  type: TrackType;
  days: string[];
  time: string | null;
  amount: string | null;
};
type IPet = { id: number; name: string; track: PetTrack[] };

const create = async (name: string, userId: number): Promise<IPet> => {
  const createdPet = await Pet.create({
    data: {
      name,
      owners: {
        create: {
          userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  await trackService.createDefaults(createdPet.id);

  return { ...createdPet, track: [] };
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
          track: {
            select: {
              id: true,
              label: true,
              amount: true,
              type: true,
              days: true,
              time: true,
            },
          },
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
