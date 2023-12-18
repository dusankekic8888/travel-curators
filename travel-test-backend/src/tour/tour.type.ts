import { Prisma } from '@prisma/client';
import { include } from './tour.select.js';

export type PayloadInclude = Prisma.TourGetPayload<{
  include: typeof include;
}>;
