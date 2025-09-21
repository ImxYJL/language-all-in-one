import { patchIsFavoriteApi, PatchIsFavoriteParams } from '@/apis/vocabulary';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKeys';
import { AxiosError } from 'axios';
import { ItemType, SentenceListResponse, WordListResponse } from '@/types/vocabulary';

interface UseToggleIsFavoriteParams {
  itemType: ItemType;
}

export const useToggleIsFavorite = ({ itemType }: UseToggleIsFavoriteParams) => {
  const queryClient = useQueryClient();
  const partialQueryKey = itemType === 'word' ? [QUERY_KEY.words] : [QUERY_KEY.sentences];

  return useMutation({
    mutationFn: patchIsFavoriteApi,

    onMutate: async (variables: PatchIsFavoriteParams) => {
      await queryClient.cancelQueries({ queryKey: partialQueryKey });

      const queryCache = queryClient.getQueryCache();
      const queriesToUpdate = queryCache.findAll({
        queryKey: partialQueryKey,
        predicate: (query) => query.state.data !== undefined,
      });

      const snapshot = queriesToUpdate.map((query) => ({
        queryKey: query.queryKey,
        previousData: query.state.data,
      }));

      snapshot.forEach(({ queryKey }) => {
        if (queryKey[0] === QUERY_KEY.words) {
          queryClient.setQueryData<InfiniteData<WordListResponse>>(queryKey, (oldData) => {
            if (!oldData) return undefined;
            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                items: page.items.map((item) =>
                  item.id === variables.id ? { ...item, favorited: variables.isFavorite } : item,
                ),
              })),
            };
          });
        } else if (queryKey[0] === QUERY_KEY.sentences) {
          queryClient.setQueryData<InfiniteData<SentenceListResponse>>(queryKey, (oldData) => {
            if (!oldData) return undefined;
            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                items: page.items.map((item) =>
                  item.id === variables.id ? { ...item, favorited: variables.isFavorite } : item,
                ),
              })),
            };
          });
        }
      });

      return { snapshot };
    },

    onError: (error: unknown, _, context) => {
      context?.snapshot.forEach(({ queryKey, previousData }) => {
        queryClient.setQueryData(queryKey, previousData);
      });

      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data?.message;
        alert(serverMessage || '즐겨찾기 정보를 갱신하던 중 에러가 발생했습니다.');
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: partialQueryKey }),
    throwOnError: false,
  });
};
