import { User } from '@prisma/client';
// password: password
export const userList: Array<Omit<User, 'id'>> = [
  {
    username: 'Admin',
    email: 'admin@gmail.com',
    role: 'admin',
    password:
      '$scrypt$N=32768,r=8,p=1,maxmem=67108864$yb3T7SHe4IPhsWFSLgQ6BHbrVT2F5eHpWa0AVJrrVVM$TUas2+/mo6nPrir/kWOLvKky4wFpk8WvBSyxhw+9Kl0JiiPy4LyUSkxXYdZ2OEfCPOJoGAbxXxlCoCzWDWo7Xg',
    image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
  },
  {
    username: 'TestUser',
    email: 'editor@gmail.com',
    role: 'editor',
    password:
      '$scrypt$N=32768,r=8,p=1,maxmem=67108864$yb3T7SHe4IPhsWFSLgQ6BHbrVT2F5eHpWa0AVJrrVVM$TUas2+/mo6nPrir/kWOLvKky4wFpk8WvBSyxhw+9Kl0JiiPy4LyUSkxXYdZ2OEfCPOJoGAbxXxlCoCzWDWo7Xg',
    image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
  }
];
