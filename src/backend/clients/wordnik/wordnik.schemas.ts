import { z } from 'zod';

export const WnErrorSchema = z.object({
  statusCode: z.number(),
  error: z.string(),
  message: z.string(),
});

export const WnRandomWordSchema = z.object({
  id: z.number(),
  word: z.string(),
});

export const WnDefinitionSchema = z.object({
  text: z.string().min(1).optional(),
  partOfSpeech: z.string().nullable().optional(),
});
export const WnDefinitionsSchema = z.array(WnDefinitionSchema);

export const WnRelatedItemSchema = z.object({
  relationshipType: z.string(),
  words: z.array(z.string()),
});
export const WnRelatedSchema = z.union([z.array(WnRelatedItemSchema), WnErrorSchema]).transform((data) => {
  if (Array.isArray(data)) {
    return data;
  }

  console.info('Wordnik API returned 404 Not Found for relatedWords, which is handled as an empty array.');
  return [];
});

export type WnRandomWord = z.infer<typeof WnRandomWordSchema>;
export type WnDefinition = z.infer<typeof WnDefinitionSchema>;
export type WnRelatedItem = z.infer<typeof WnRelatedItemSchema>;
