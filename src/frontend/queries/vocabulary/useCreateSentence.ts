import { postSentenceApi } from '@/apis/vocabulary';
import { CreateSentenceParsed } from '@/types/vocabulary';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKeys';
import { AxiosError } from 'axios';

interface useCreateSentenceParams {
  onSuccess: () => void;
}

export const useCreateSentence = ({ onSuccess }: useCreateSentenceParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateSentenceParsed) => postSentenceApi(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.sentences] });
      onSuccess();
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data?.message;

        if (serverMessage) {
          alert(serverMessage);
        } else {
          alert('문장 추가 중 에러가 발생했습니다.');
        }
      }
    },
    throwOnError: false,
  });
};
