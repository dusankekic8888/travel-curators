export const createdBy = {
  select: {
    id: true,
    username: true,
    role: true,
    image: true,
  },
};

export const include = {
  createdBy,
};
