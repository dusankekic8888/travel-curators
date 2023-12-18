export const tour = {
  select: {
    id: true,
    title: true,
    description: true,
    thumbnail: true,
    createdAt: true,
    updatedAt: true,
    createdById: true,
  },
};

export const customer = {
  select: {
    id: true,
    name: true,
    address: true,
    email: true,
    phone: true,
  },
};

export const include = {
  tour,
  customer,
};
