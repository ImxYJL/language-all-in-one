export const ITEM_TYPES = {
  word: 'word',
  sentence: 'sentence',
} as const;

export type ItemType = (typeof ITEM_TYPES)[keyof typeof ITEM_TYPES];
