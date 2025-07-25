'use client';

import '@/app/globals.css';
import { pretendard } from './fonts/pretendard';
import { QueryProvider } from '@/frontend/providers';
import startMockWorker from '@/libs/msw/startMockWorker';
import { useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    startMockWorker();
  }, []);

  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
