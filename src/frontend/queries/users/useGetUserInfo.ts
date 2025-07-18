import { getUserInfo } from '@/apis/users';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKeys';

export function useGetUserInfo() {
  return useQuery({
    queryKey: [QUERY_KEY.getUserInfo],
    queryFn: getUserInfo,
    staleTime: 1000 * 60,
  });
}
