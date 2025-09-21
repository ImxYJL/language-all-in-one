export const ENDPOINT = {
  login: '/login',
  randomWord: '/wordnik',
  words: '/vocab/words',
  sentences: '/vocab/sentences',
  favoriteItem: (itemId: string) => `/items/${itemId}/favorite`,
} as const;
