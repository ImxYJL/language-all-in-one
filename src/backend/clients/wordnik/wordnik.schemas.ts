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
export const WnRelatedSchema = z.any().transform((data) => {
  // 만약 /relatedWords API 응답이 정상적인 배열이면 그대로 파싱해 반환
  if (Array.isArray(data)) {
    return WnRelatedItemSchema.array().parse(data);
  }

  console.warn(
    'Received non-array response for relatedWords. Returning empty array. Discarded data:',
    JSON.stringify(data),
  );

  return [];
});

export const WnErrorSchema = z
  .object({
    message: z.string().optional(),
    error: z.string().optional(),
  })
  .loose();

export type WnRandomWord = z.infer<typeof WnRandomWordSchema>;
export type WnDefinition = z.infer<typeof WnDefinitionSchema>;
export type WnRelatedItem = z.infer<typeof WnRelatedItemSchema>;
