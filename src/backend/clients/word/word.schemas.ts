import { z } from 'zod';

export const CreateWordInputSchema = z.object({
  headword: z.string().min(1, 'headword는 필수입니다.'),
  lemma: z.string().optional(),
  phonetic: z.string().optional(),
  favorited: z.boolean().optional().default(false),
  tags: z.array(z.string().min(1)).optional(),
  examples: z
    .array(
      z.object({
        text: z.string().min(1),
        source: z.string().optional(),
        message_id: z.string().uuid().optional(),
      }),
    )
    .optional(),
});

export type CreateWordInput = z.infer<typeof CreateWordInputSchema>;
