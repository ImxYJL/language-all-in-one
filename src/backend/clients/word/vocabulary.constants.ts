export const ITEM_TYPES = ['word', 'sentence'] as const;
export const ITEM_TYPE = { word: 'word', sentence: 'sentence' } as const;

export const FORMALITY_TYPE = {
  slang: 'slang',
  casual: 'casual',
  formal: 'formal',
  literary: 'literary',
  etc: 'etc',
} as const;

export type ItemType = (typeof ITEM_TYPES)[number];
export type FormalityType = keyof typeof FORMALITY_TYPE;
