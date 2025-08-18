import { z } from 'zod';

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
export const WnRelatedSchema = z.array(WnRelatedItemSchema);

export const WnErrorSchema = z
  .object({
    message: z.string().optional(),
    error: z.string().optional(),
  })
  .loose();

export type WnRandomWord = z.infer<typeof WnRandomWordSchema>;
export type WnDefinition = z.infer<typeof WnDefinitionSchema>;
export type WnRelatedItem = z.infer<typeof WnRelatedItemSchema>;
