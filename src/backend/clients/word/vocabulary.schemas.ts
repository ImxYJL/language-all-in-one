import { z } from 'zod';
import { ITEM_TYPE } from './vocabulary.constants';

// 단어, 문장의 공통 스키마
export type ItemType = 'word' | 'sentence';

export const CreateVocabularySchema = z.object({
  itemType: z.enum(ITEM_TYPE),
  favorited: z.boolean().optional().default(false),
  tags: z.array(z.string().min(1)).optional(),
});

// 예문
const ExampleSchema = z.object({
  text: z.string().min(1),
  source: z.string().nullable().optional(),
  message_id: z.uuid().nullable().optional(),
});

export const CreateWordSchema = CreateVocabularySchema.extend({
  itemType: z.literal('word'),
  headword: z.string().min(1),
  lemma: z.string().optional(), // 없으면 서버에서 계산
  phonetic: z.string().optional(),
  examples: z.array(ExampleSchema).nullable().optional(),
});

export const CreateSentenceSchema = CreateVocabularySchema.extend({
  itemType: z.literal('sentence'),
  text: z.string().min(1),
  translation: z.string().optional(),
  source: z.string().optional(),
  formality: z.string().optional(),
});

export type CreateWordInput = z.infer<typeof CreateWordSchema>;
export type CreateSentenceInput = z.infer<typeof CreateSentenceSchema>;
export type ExampleInput = z.infer<typeof ExampleSchema>;
