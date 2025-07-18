import { getUserInfo } from '@/apis/users';
import UserInfo from '@/frontend/components/dashboard/UserInfo';
import { QueryProvider } from '@/frontend/providers';
import { QUERY_KEY } from '@/frontend/queries/queryKeys';
import { QueryClient, dehydrate } from '@tanstack/react-query';

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
