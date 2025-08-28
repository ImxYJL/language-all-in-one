import lemmatizer from 'wink-lemmatizer';

const normalizeWord = (word: string) => word.trim().toLowerCase();

export function lemmatizeHeadword(rawHeadword: string): string {
  const headword = normalizeWord(rawHeadword);
  const candidates = [
    lemmatizer.noun(headword),
    lemmatizer.verb(headword),
    lemmatizer.adjective(headword),
    lemmatizer.adverb(headword),
  ];
  const lemma = candidates.find((candidate) => candidate !== headword);

  return lemma ?? headword;
}
