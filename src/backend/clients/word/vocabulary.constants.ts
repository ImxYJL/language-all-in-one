export const ITEM_TYPES = ['word', 'sentence'] as const;
export const ITEM_TYPE = { word: 'word', sentence: 'sentence' } as const;

export const FORMALITY_TYPE = {
  slang: 'slang',
  casual: 'casual',
  formal: 'formal',
  literary: 'literary',
  etc: 'etc',
} as const;

export const ITEMS_PER_VOCABULARY_PAGE = 20;
