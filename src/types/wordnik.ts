export type AppDefinition = {
  text: string;
  partOfSpeech?: string;
};

export type AppWordBundle = {
  word: string;
  definitions: AppDefinition[];
  synonyms: string[];
  fromCache?: boolean;
};
