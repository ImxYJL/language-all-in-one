import type { AppDefinition, AppWordBundle } from '@/types/word';
import { wordnikClient } from '@/backend/clients/wordnik/wordnik.clients';
import type { WnDefinition } from '@/backend/clients/wordnik/wordnik.schemas';
import { getCachedRandomWord } from '../cache/word.cache';

function hasText(d: WnDefinition): d is WnDefinition & { text: string } {
  return typeof d.text === 'string' && d.text.length > 0;
}

export async function getWordBundle(word: string): Promise<AppWordBundle> {
  const [rawDefinitions, relations] = await Promise.all([
    wordnikClient.getDefinitions(word),
    wordnikClient.getRelated(word),
  ]);

  const definitions: AppDefinition[] = rawDefinitions
    .filter(hasText)
    .map((d) => ({ text: d.text, partOfSpeech: d.partOfSpeech ?? undefined }));

  const synonyms = relations.find((r) => r.relationshipType === 'synonym')?.words ?? [];

  return { word, definitions, synonyms };
}

export async function getWordBundleRandom(retries = 3): Promise<AppWordBundle> {
  for (let i = 0; i < retries; i++) {
    const word = await getCachedRandomWord();
    const bundle = await getWordBundle(word);

    if (bundle.definitions.length > 0) return bundle;
  }
  throw new Error('No suitable random word after retries');
}
