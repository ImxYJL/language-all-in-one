'use client';

import { Suspense } from 'react';
import WordList from './WordList';
import SentenceList from './SentenceList';
import { StarLoader } from '../common';

export interface VocaListProps {
  isFavorite: boolean;
  isWordTab: boolean;
}

export type VocaListContentProps = Omit<VocaListProps, 'isWordTab'>;

const VocaList = ({ isFavorite, isWordTab }: VocaListProps) => {
  return (
    <Suspense fallback={<StarLoader />}>
      <ul className="m-4 flex flex-col gap-3 p-2">
        {isWordTab ? <WordList isFavorite={isFavorite} /> : <SentenceList isFavorite={isFavorite}></SentenceList>}
      </ul>
    </Suspense>
  );
};

export default VocaList;
