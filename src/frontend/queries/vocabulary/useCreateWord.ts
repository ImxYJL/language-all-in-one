import { postWordApi } from '@/apis/vocabulary';
import { CreateWordParsed } from '@/types/vocabulary';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKeys';
import { toast } from 'react-toastify';
import { getAxiosMessage } from '@/libs/axios/utils';

interface useCreateWordParams {
  onSuccess: () => void;
}

export const useCreateWord = ({ onSuccess }: useCreateWordParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateWordParsed) => postWordApi(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.words] });
      toast.success('성공적으로 문장을 추가했습니다.', {
        position: 'top-center',
      });
      onSuccess();
    },
    throwOnError: false,
    onError: (e: Error) =>
      toast.error(getAxiosMessage(e), {
        position: 'top-center',
      }),
  });
};
