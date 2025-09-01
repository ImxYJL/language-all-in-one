export const ITEM_TYPE = {
  word: 'word',
  sentence: 'sentence',
} as const;

export type ItemType = (typeof ITEM_TYPE)[keyof typeof ITEM_TYPE];
