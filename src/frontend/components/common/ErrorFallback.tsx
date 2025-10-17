'use client';

import { ErrorSection } from '@/frontend/components/common';
import { useRouter } from 'next/navigation';
import { FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const router = useRouter();

  const goChatPage = () => {
    resetErrorBoundary();
    router.push('/chat');
  };

  return (
    <ErrorSection
      errorMessage={error.message ?? '알 수 없는 에러가 발생했습니다'}
      handleReload={resetErrorBoundary}
      handleGoOtherPage={goChatPage}
    />
  );
};

export default ErrorFallback;
