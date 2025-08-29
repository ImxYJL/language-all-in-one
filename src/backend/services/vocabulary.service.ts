import { adminSupabase } from '@/libs/supabase/client';
import { CreateWordInput } from '../clients/word/vocabulary.schemas';

export type ExampleInput = { text: string; source?: string | null; message_id?: string | null };

export function mapExamples(examples?: ExampleInput[] | null) {
  if (!examples) return null;
  return examples.map((e) => ({
    text: e.text,
    source: e.source ?? null,
    message_id: e.message_id ?? null,
  }));
}

export async function addWord(userId: string, params: CreateWordInput & { lemma: string }) {
  const { data, error } = await adminSupabase.rpc('create_word_v2', {
    p_user_id: userId,
    p_lemma: params.lemma,
    p_headword: params.headword ?? null,
    p_phonetic: params.phonetic ?? null,
    p_tags: params.tags ?? null, // 선택
    p_examples: mapExamples(params.examples), // 선택
    p_favorited: params.favorited ?? false,
  });
  if (error) throw error;
  return { itemId: data as string }; // 함수는 uuid 단일 값
}

// 나중에 스키마 맞춰서 값 수정해야 함
// export async function addSentence(userId: string, params: CreateSentenceInput & { lemma: string }) {
//   const { data, error } = await adminSupabase.rpc('create_sentence_v2', {
//     p_user_id: userId,
//     p_headword: params.headword ?? null,
//     p_phonetic: params.phonetic ?? null,
//     p_tags: params.tags ?? null,
//     p_examples: mapExamples(params.examples),
//     p_favorited: params.favorited ?? false,
//   });
//   if (error) throw error;
//   return { itemId: data as string };
// }
