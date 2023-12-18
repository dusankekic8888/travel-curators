import { Prisma } from '@prisma/client';
import { include } from './booking.select.js';

export type PayloadInclude = Prisma.BookingGetPayload<{
  include: typeof include;
}>;
