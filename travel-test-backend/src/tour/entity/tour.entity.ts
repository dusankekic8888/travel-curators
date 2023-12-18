import { Tour } from '@prisma/client';

export class TourEntity implements Tour {
  id: number;

  title: string;

  description: string;

  thumbnail: string;

  createdAt: Date;

  updatedAt: Date;

  createdById: number;
}
