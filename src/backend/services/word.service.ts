import type { AppDefinition, AppWordBundle } from '@/types/word';
import { getDefinitions, getRelated, getRandomWord } from '@/backend/clients/wordnik/wordnik.clients';
import type { WnDefinition } from '@/backend/clients/wordnik/wordnik.schemas';

function hasText(d: WnDefinition): d is WnDefinition & { text: string } {
  return typeof d.text === 'string' && d.text.length > 0;
}

export async function getWordBundle(word: string): Promise<AppWordBundle> {
  const [defs, rel] = await Promise.all([getDefinitions(word), getRelated(word)]);

  const definitions: AppDefinition[] = defs
    .filter(hasText)
    .map((d) => ({ text: d.text, partOfSpeech: d.partOfSpeech ?? undefined }));

  const synonyms = rel.find((r) => r.relationshipType === 'synonym')?.words ?? [];
  return { word, definitions, synonyms };
}

export async function getWordBundleRandom(retries = 3): Promise<AppWordBundle> {
  for (let i = 0; i < retries; i++) {
    const word = await getRandomWord();
    const bundle = await getWordBundle(word);
    if (bundle.definitions.length > 0) return bundle;
  }
  throw new Error('No suitable random word after retries');
}
