import { getUserInfo } from '@/apis/users';
import UserInfo from '@/frontend/components/dashboard/UserInfo';
import { QueryProvider } from '@/frontend/providers';
import { QUERY_KEY } from '@/frontend/queries/queryKeys';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import startMockWorker from '@/libs/msw/startMockWorker';

if (process.env.NODE_ENV === 'development') {
  await import('@/libs/msw/server'); // ✅ 이걸 호출해야 server.listen()이 실행됨
}

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.getUserInfo],
    queryFn: getUserInfo,
  });

  const dehydratedState = dehydrate(queryClient);
  console.log('dehydratedState', dehydratedState);

  return (
    <QueryProvider dehydratedState={dehydratedState}>
      <div className="p-6">
        <h1 className="mb-4 text-xl font-bold">테스트 하이드레이션 페이지</h1>
        <UserInfo />
      </div>
    </QueryProvider>
  );
}
