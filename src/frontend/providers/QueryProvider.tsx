'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactQueryDevtoolsProvider from './ReactQueryDevtoolsProvider';
import { makeQueryClient } from '@/libs/tanstack/queryClient';

let browserQueryClient: QueryClient | undefined = undefined;

const getBrowserQueryClient = () => {
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
};

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getBrowserQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtoolsProvider />
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
