import type { SupabaseClient } from '@supabase/supabase-js';
import type { CreateSentenceInput, CreateWordInput, ExampleInput } from '../clients/word/vocabulary.schemas';

// TODO: as 없애기
export function mapExamples(examples?: ExampleInput[] | null) {
  if (!examples) return null;

  return examples.map((e) => ({
    text: e.text,
    source: e.source ?? null,
    message_id: e.message_id ?? null,
  }));
}

type AddItemReturn = Promise<{ itemId: string }>;

export async function addWord(db: SupabaseClient, params: CreateWordInput): AddItemReturn {
  const p_examples = params.examples ?? null;
  const { data, error } = await db.rpc('create_word_v3', {
    p_headword: params.headword,
    p_lemma: params.lemma ?? null,
    p_phonetic: params.phonetic ?? null,
    p_favorited: params.favorited ?? false,
    p_tags: params.tags ?? null,
    p_examples,
  });
  if (error) throw error;

  return { itemId: data };
}

export async function addSentence(db: SupabaseClient, params: CreateSentenceInput): AddItemReturn {
  const { data, error } = await db.rpc('create_sentence_v2', {
    p_text: params.text,
    p_translation: params.translation ?? null,
    p_formality: params.formality ?? null,
    p_source: params.source ?? null,
    p_tags: params.tags ?? null,
    p_favorited: params.favorited ?? false,
  });
  if (error) throw error;

  return { itemId: data };
}

type ToggleRow = { item_id: string; favorited: boolean; favorited_at: string | null };

export async function toggleFavorite(
  supabase: SupabaseClient,
  itemId: string,
  value: boolean,
): Promise<ToggleRow | null> {
  const { data, error } = await supabase.rpc('toggle_item_favorite', { p_item_id: itemId, p_force_value: value });
  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : data; // RETURN Table 형식에 맞춘 정규화

  return row ?? null;
}
