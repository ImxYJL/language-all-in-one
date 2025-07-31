export const LOGIN = {
  username: {
    min: 1,
    max: 20,
  },
  password: {
    min: 8,
    max: 40,
  },
} as const;
