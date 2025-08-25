import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKeys';
import { getRandomWordApi } from '@/apis/word';
import { formatKstYmd } from '@/app/utils/times';

const useGetRandomWord = () => {
  const todayKst = formatKstYmd();

  return useQuery({
    queryKey: [QUERY_KEY.getRandomWord, todayKst],
    queryFn: getRandomWordApi,
    staleTime: Infinity,
  });
};

export default useGetRandomWord;
