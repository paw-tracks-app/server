import { Prisma, TrackType } from '@prisma/client';

export const DEFAULT_TRACKS: Omit<Prisma.TrackCreateManyInput, 'petId'>[] = [
  {
    label: 'Medicine',
    type: TrackType.MEDICINE,
  },
  {
    label: 'Meal',
    type: TrackType.MEAL,
  },
  {
    label: 'Treat',
    type: TrackType.TREAT,
  },
];
