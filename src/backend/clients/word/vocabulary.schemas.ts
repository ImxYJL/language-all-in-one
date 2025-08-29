import { z } from 'zod';

// 단어, 문장의 공통 스키마
export const CreateVocabularySchema = z.object({
  favorited: z.boolean().optional().default(false),
  tags: z.array(z.string().min(1)).optional(),
});

export const CreateWordSchema = CreateVocabularySchema.extend({
  headword: z.string().min(1),
  lemma: z.string().optional(), // 없으면 서버에서 계산
  phonetic: z.string().optional(),
  examples: z
    .array(
      z.object({
        text: z.string().min(1),
        source: z.string().optional(),
        message_id: z.uuid().optional(),
      }),
    )
    .optional(),
});

export const CreateSentenceBundleSchema = CreateVocabularySchema.extend({
  text: z.string().min(1),
  translation: z.string().optional(),
  source: z.string().optional(),
  formality: z.string().optional(),
});

export type CreateWordInput = z.infer<typeof CreateWordSchema>;
