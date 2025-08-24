'use client';

import { DehydratedState, HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import ReactQueryDevtoolsProvider from './ReactQueryDevtoolsProvider';
import { makeQueryClient } from '@/libs/tanstack/queryClient';

const QueryProvider = ({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}) => {
  const [clientState] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={clientState}>
      <ReactQueryDevtoolsProvider />
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
};

export default QueryProvider;
