import { useMutation } from '@tanstack/react-query';
import { login } from '@/apis/auth';
import { LoginRequestBody } from '@/types/auth';
import { toast } from 'react-toastify';
import { getAxiosMessage } from '@/libs/axios/utils';

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ username, password }: LoginRequestBody) => login({ username, password }),
    throwOnError: false,
    onError: (e: Error) =>
      toast.error(getAxiosMessage(e), {
        position: 'top-center',
      }),
  });
};
