import { postWordApi } from '@/apis/vocabulary';
import { CreateWordParsed } from '@/types/vocabulary';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKeys';
import { AxiosError } from 'axios';

interface useCreateWordParams {
  onSuccess: () => void;
}

export const useCreateWord = ({ onSuccess }: useCreateWordParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateWordParsed) => postWordApi(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.words] });
      onSuccess();
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data?.message;

        if (serverMessage) {
          alert(serverMessage);
        } else {
          alert('단어 추가 중 에러가 발생했습니다.');
        }
      }
    },
    throwOnError: false,
  });
};
