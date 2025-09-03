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

export type CreateWordInput = z.infer<typeof CreateWordSchema>;
export type CreateSentenceInput = z.infer<typeof CreateSentenceSchema>;
export type ExampleInput = z.infer<typeof ExampleSchema>;
export type VocaListRequest = z.infer<typeof VocaListRequestSchema>;
