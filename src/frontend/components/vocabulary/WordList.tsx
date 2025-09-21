'use client';

import useInfiniteScroll from '@/frontend/hooks/useInfiniteScroll';
import { useGetWords } from '@/frontend/queries/vocabulary/useGetWords';
import { VocaListContentProps } from './VocaList';
import VocaItem from './VocaItem';

const WordList = ({ isFavorite }: VocaListContentProps) => {
  const { words, fetchNextPage, isFetchingNextPage, isLastPage } = useGetWords(isFavorite);

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    isFetchingNextPage,
    isLastPage,
  });

  return (
    <>
      {words.map((word) => (
        <VocaItem
          key={word.id}
          id={word.id}
          itemType="word"
          voca={word.word.headword}
          meaning={word.word.meaningKo ?? ''}
          isFavorite={word.favorited}
        />
      ))}

      {!isLastPage && !isFetchingNextPage && <div ref={observerRef} style={{ minHeight: '1px' }} />}
    </>
  );
};

export default WordList;
