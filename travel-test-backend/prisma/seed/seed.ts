import { PrismaClient } from '@prisma/client';

import { userList, tourList } from '.';

const prisma = new PrismaClient();

type Entity = {
  [key: string]: any;
};

async function execute<T extends Entity, K extends keyof T>(
  list: Array<T>,
  entity: string,
  where: K,
) {
  for await (const item of list) {
    const result = await prisma[entity].upsert({
      where: { [where]: item[where] },
      update: {},
      create: {
        ...item,
      },
    });

    console.dir({ result });
  }
}

async function main() {
  await execute(userList, 'user', 'email');
  await execute(tourList, 'tour', 'id');
  const result = await prisma.$queryRaw`SELECT setval('public."Tour_id_seq"', max(id)) FROM public."Tour";`
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
