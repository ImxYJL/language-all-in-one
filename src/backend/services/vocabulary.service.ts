import type { SupabaseClient } from '@supabase/supabase-js';
import type { CreateWordInput, ExampleInput } from '../clients/word/vocabulary.schemas';

export function mapExamples(examples?: ExampleInput[] | null) {
  if (!examples) return null;
  return examples.map((e) => ({
    text: e.text,
    source: e.source ?? null,
    message_id: e.message_id ?? null,
  }));
}

// 단어 추가
export async function addWord(supabase: SupabaseClient, userId: string, params: CreateWordInput & { lemma: string }) {
  const p_examples =
    params.examples?.map((e) => ({
      text: e.text,
      source: e.source ?? null,
      message_id: e.message_id ?? null,
    })) ?? null; // ⬅️ undefined → null

  const { data, error } = await supabase.rpc('create_item_v2', {
    p_user_id: userId,
    p_item_type: 'word',
    p_lemma: params.lemma,
    p_headword: params.headword ?? null,
    p_phonetic: params.phonetic ?? null,
    p_favorited: params.favorited ?? false,
    p_tags: params.tags ?? null,
    p_examples, // ⬅️ null 또는 jsonb[]
  });
  if (error) throw error;
  return { itemId: data as string };
}

// 문장 추가 (스키마에 맞게 headword를 본문으로 사용)
export type CreateSentenceInput = {
  headword: string;
  phonetic?: string | null;
  tags?: string[] | null;
  examples?: ExampleInput[] | null;
  favorited?: boolean | null;
  lemma?: string | null; // 필요 없다면 호출에서 headword로 대체
};

export async function addSentence(
  supabase: SupabaseClient,
  userId: string,
  params: CreateSentenceInput & { lemma: string },
) {
  const { data, error } = await supabase.rpc('create_sentence_v2', {
    p_user_id: userId,
    p_lemma: params.lemma,
    p_headword: params.headword ?? null,
    p_phonetic: params.phonetic ?? null,
    p_tags: params.tags ?? null,
    p_examples: mapExamples(params.examples),
    p_favorited: params.favorited ?? false,
  });
  if (error) throw error;
  return { itemId: data as string };
}

// 즐겨찾기 토글/설정
export async function toggleFavorite(
  supabase: SupabaseClient,
  itemId: string,
  value?: boolean, // 전달하면 강제값, 없으면 토글
) {
  const { data, error } = await supabase.rpc('toggle_item_favorite', {
    p_item_id: itemId,
    p_force_value: value ?? null,
  });
  if (error) throw error;
  // data는 { item_id, favorited, favorited_at } 한 행
  return data as { item_id: string; favorited: boolean; favorited_at: string | null };
}
