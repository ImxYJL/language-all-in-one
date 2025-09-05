import { z } from 'zod';
import { FORMALITY_TYPE, ITEM_TYPE, ITEM_TYPES, ITEMS_PER_VOCABULARY_PAGE } from './vocabulary.constants';

// 단어, 문장의 공통 스키마
const CreateVocabularySchema = z.object({
  itemType: z.enum(ITEM_TYPES),
  favorited: z.boolean().optional().default(false),
  tags: z.array(z.string().min(1)).nullable().optional(),
});

// 단어 예문
export const ExampleSchema = z.object({
  text: z.string().min(1),
  source: z.string().nullable().optional(),
  message_id: z.uuid().nullable().optional(),
});

export const CreateWordSchema = CreateVocabularySchema.extend({
  itemType: z.literal(ITEM_TYPE.word).default(ITEM_TYPE.word),
  headword: z.string().min(1),
  meaningKo: z.string().optional(),
  lemma: z.string().optional(), // 없으면 서버에서 계산
  phonetic: z.string().optional(),
  examples: z.array(ExampleSchema).nullable().optional(),
});

export const FormalitySchema = z.enum(Object.keys(FORMALITY_TYPE));

export const CreateSentenceSchema = CreateVocabularySchema.extend({
  itemType: z.literal(ITEM_TYPE.sentence).default(ITEM_TYPE.sentence),
  text: z.string().min(1),
  translation: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  formality: FormalitySchema.nullable().optional(),
});

export const VocaListRequestSchema = z.object({
  favorited: z.enum(['true', 'false']).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(ITEMS_PER_VOCABULARY_PAGE),
  afterId: z.uuid().optional(),
});
