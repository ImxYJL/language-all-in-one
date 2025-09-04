import type { SupabaseClient } from '@supabase/supabase-js';

import { ITEMS_PER_VOCABULARY_PAGE } from '../clients/word/vocabulary.constants';
import {
  CreateSentenceInput,
  CreateWordInput,
  ExampleInput,
  FormalityType,
  ItemType,
  SentenceListResponse,
  VocaListRequest,
  WordListResponse,
} from '@/types/vocabulary';

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
    p_meaningKo: params.meaningKo ?? null,
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

type DbBaseRow = {
  item_id: string;
  type: ItemType;
  favorited: boolean;
};

type DbWordCols = {
  headword: string | null; // NOTE: ItemType이 Sentence인 경우 null
  meaning_ko: string | null;
  lemma: string | null;
  phonetic: string | null;
};

type DbSentenceCols = {
  text: string | null; // headword와 마찬가지
  translation: string | null;
  formality: FormalityType | null;
};

export type DbListRow = DbBaseRow & DbWordCols & DbSentenceCols;

export async function getVocabList(
  supabase: SupabaseClient,
  itemType: ItemType,
  queryParam: VocaListRequest,
): Promise<WordListResponse | SentenceListResponse | null> {
  const { data, error } = await supabase
    .rpc('list_items_v1', {
      p_type: itemType,
      p_favorited: queryParam.favorited ? queryParam.favorited === 'true' : null,
      p_limit: queryParam.limit ?? ITEMS_PER_VOCABULARY_PAGE,
      p_after_id: queryParam.afterId ?? null,
    })
    .overrideTypes<DbListRow[]>();
  if (error) throw error;

  const rows = (data ?? []) as DbListRow[];

  if (itemType === 'word') {
    const items = rows.map((r) => ({
      id: r.item_id,
      favorited: r.favorited,
      word: {
        headword: r.headword,
        meaningKo: r.meaning_ko,
        lemma: r.lemma,
        phonetic: r.phonetic,
      },
    }));
    const lastItem = items.at(-1);

    return {
      items,
      next: lastItem ? { afterId: lastItem.id } : null,
    };
  } else {
    const items = rows.map((r) => ({
      id: r.item_id,
      favorited: r.favorited,
      sentence: {
        text: r.text ?? '',
        translation: r.translation,
      },
    }));
    const lastItem = items.at(-1);

    return {
      items,
      next: lastItem ? { afterId: lastItem.id } : null,
    };
  }
}
