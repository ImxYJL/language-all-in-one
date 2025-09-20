'use client';

import useInfiniteScroll from '@/frontend/hooks/useInfiniteScroll';
import { VocaListContentProps } from './VocaList';
import VocaItem from './VocaItem';
import useGetSentences from '@/frontend/queries/vocabulary/useGetSentences';

const SentenceList = ({ isFavorite }: VocaListContentProps) => {
  const { sentences, fetchNextPage, isFetchingNextPage, isLastPage } = useGetSentences(isFavorite);

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    isFetchingNextPage,
    isLastPage,
  });

  return (
    <>
      {sentences.map((sentences) => (
        <VocaItem
          key={sentences.id}
          id={sentences.id}
          voca={sentences.sentence.text}
          meaning={sentences.sentence.translation ?? ''}
          isFavorite={sentences.favorited}
        />
      ))}

      {!isLastPage && !isFetchingNextPage && <div ref={observerRef} style={{ minHeight: '1px' }} />}
    </>
  );
};

export default SentenceList;
