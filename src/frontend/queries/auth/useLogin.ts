import { useMutation } from '@tanstack/react-query';
import { login } from '@/apis/auth';
import { LoginRequestBody } from '@/types/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: ({username, password}: LoginRequestBody) => login({username, password}),
  });
};
