import { Prisma } from '@prisma/client';

import { Track } from '../config/prisma';
import { DEFAULT_TRACKS } from './constants';

const createDefaults = async (petId: number) => {
  const createdTrack = await Track.createMany({
    data: DEFAULT_TRACKS.map(defaultTrack => ({
      ...defaultTrack,
      petId,
    })),
  });

  return createdTrack;
};

const createTrack = async (data: Prisma.TrackCreateInput) => {
  const createdTrack = await Track.create({
    data,
  });

  return createdTrack;
};

export default {
  createDefaults,
  createTrack,
};
