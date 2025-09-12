import { FORMALITY_TYPE, ITEM_TYPES } from '@/backend/clients/word/vocabulary.constants';
import {
  CreateSentenceSchema,
  CreateWordSchema,
  ExampleSchema,
  VocaListRequestSchema,
} from '@/backend/clients/word/vocabulary.schemas';
import z from 'zod';

export type ItemType = (typeof ITEM_TYPES)[number];
export type FormalityType = keyof typeof FORMALITY_TYPE;

// 유저 입력 타입
export type CreateWordInput = z.input<typeof CreateWordSchema>;
export type CreateWordParsed = z.output<typeof CreateWordSchema>;
export type CreateSentenceInput = z.input<typeof CreateSentenceSchema>;
export type CreateSentenceParsed = z.output<typeof CreateSentenceSchema>;
export type ExampleInput = z.infer<typeof ExampleSchema>;
export type VocaListRequest = z.infer<typeof VocaListRequestSchema>;

// 응답 타입
export type ToggleFavoriteResponse = { item_id: string; favorited: boolean; favorited_at: string | null };
export type AddItemResponse = Promise<{ itemId: string }>;

export type WordItemType = {
  id: string;
  favorited: boolean;
  word: {
    headword: string;
    meaningKo: string | null;
  };
};
// TODO: 추후 상세 모달 추가
// const WordDetailType = WordItemType &

export type SentenceItemType = {
  id: string;
  favorited: boolean;
  sentence: {
    text: string;
    translation: string | null;
  };
};

export type NextVocaCursor = {
  afterId: string;
} | null;

export type WordListResponse = {
  items: WordItemType[];
  next: NextVocaCursor;
};

export type SentenceListResponse = {
  items: SentenceItemType[];
  next: NextVocaCursor;
};
