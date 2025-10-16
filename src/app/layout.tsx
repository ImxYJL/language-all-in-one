import '@/app/globals.css';
import { pretendard } from './fonts/pretendard';
import { QueryProvider } from '@/frontend/providers';
import startMockWorker from '@/libs/msw/startMockWorker';
import { ToastContainer } from 'react-toastify';
// import { useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // useEffect(() => {
  //   startMockWorker();
  // }, []);

  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <ToastContainer autoClose={2500} />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
