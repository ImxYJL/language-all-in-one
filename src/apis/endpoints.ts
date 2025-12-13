const CONVERSATIONS_PATH = '/conversations';

export const ENDPOINT = {
  login: '/login',
  randomWord: '/wordnik',
  words: '/vocab/words',
  sentences: '/vocab/sentences',
  favoriteItem: (itemId: string) => `/items/${itemId}/favorite`,

  conversation: CONVERSATIONS_PATH,
  conversations: (conversationId: string) => `${CONVERSATIONS_PATH}/${conversationId}`,
  messages: (conversationId: string) => `${CONVERSATIONS_PATH}/${conversationId}/messages`,
} as const;
