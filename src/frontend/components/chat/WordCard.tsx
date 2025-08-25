'use client';

import { BookOpen, Hash } from 'lucide-react';
import { Card } from '../common';
import useGetRandomWord from '@/frontend/queries/chat/useGetRandomWord';
import { DefinitionList } from './DefinitionList';

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

const WordCard = () => {
  const { data: wordInfo } = useGetRandomWord();

  if (!wordInfo) return null;
  console.log(wordInfo);

  return (
    <Card>
      <Card.Header icon={<BookOpen className="text-primary h-5 w-5" />} title="오늘의 단어" titleAs="h2" />

      <div className="flex flex-col gap-3 space-y-4">
        {/* 단어 제목 */}

        <h3 className="text-primary mb-1 text-3xl font-bold">{wordInfo.word}</h3>

        {/* 정의 목록 */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 border-b border-gray-200 pb-1 text-sm font-semibold text-gray-700">
            <Hash className="h-4 w-4" />
            정의
          </h4>
          <DefinitionList defs={wordInfo.definitions} />
        </div>

        {/* 동의어 섹션 */}
        {wordInfo.synonyms && wordInfo.synonyms.length > 0 && (
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 border-b border-gray-200 pb-1 text-sm font-semibold text-gray-700">
              <Hash className="h-4 w-4" />
              동의어
            </h4>
            <div className="flex flex-wrap gap-2">
              {wordInfo.synonyms.map((synonym, index) => (
                <span
                  key={index}
                  className="bg-secondary/30 rounded-full px-3 py-1 text-sm text-gray-700 transition-colors"
                >
                  {synonym}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WordCard;
