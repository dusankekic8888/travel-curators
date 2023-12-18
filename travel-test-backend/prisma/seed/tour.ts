import { Tour } from '@prisma/client';

export const tourList: Array<Tour> = [
  {
    id: 1,
    title: 'How to train your dragon',
    description: 'Ever wonder how?',
    thumbnail: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdById: 1,
  },
  {
    id: 2,
    title: 'How to train your dragon 2',
    description: 'So toothless',
    thumbnail: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdById: 2,
  },
  {
    id: 3,
    title: 'How to train your dragon 3',
    description: 'So toothless',
    thumbnail: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdById: 1,
  },
  {
    id: 4,
    title: 'How to train your dragon 4',
    description: 'So toothless',
    thumbnail: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdById: 2,
  },
];
