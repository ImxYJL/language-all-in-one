import { useMutation } from '@tanstack/react-query';
import { login } from '@/apis/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: (id: string) => login(id),
  });
};
