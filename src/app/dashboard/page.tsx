import { QueryProvider } from '@/frontend/providers';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import startMockWorker from '@/libs/msw/startMockWorker';
import { cookies } from 'next/headers';

startMockWorker();

export default async function DashboardPage() {
  // TODO: 상수화
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        throwOnError: true,
      },
      mutations: {
        retry: 1,
        throwOnError: true,
      },
    },
  });

  // TODO: 토큰 제거
  const cookieData = await cookies();
  const token = cookieData.get('token')?.value;

  // await queryClient.prefetchQuery({
  //   queryKey: [QUERY_KEY.getUserInfo],
  //   queryFn: () => getUserInfo(token),
  // });

  const dehydratedState = dehydrate(queryClient);
  console.log('dehydratedState', dehydratedState);

  return (
    <QueryProvider dehydratedState={dehydratedState}>
      <div className="p-6">
        <h1 className="mb-4 text-xl font-bold">테스트 하이드레이션 페이지</h1>
        {/* <UserInfo /> */}
      </div>
    </QueryProvider>
  );
}
