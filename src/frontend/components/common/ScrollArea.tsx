'use client';

import { useScrollSensor } from '@/frontend/hooks';
import { useEffect } from 'react';

interface ScrollAreaProps {
  messages?: string[]; // 추후 변경 가능
  children: React.ReactNode;
  className?: string;
}

const ScrollArea = ({ messages, children, className }: ScrollAreaProps) => {
  const { containerRef, isAtBottom, scrollToBottom } = useScrollSensor<HTMLDivElement>();

  // 새 메시지가 오면 자동 스크롤
  useEffect(() => {
    if (messages && isAtBottom) {
      scrollToBottom(true);
    }
  }, [messages, isAtBottom]);

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: 'auto',
        height: '100%',
        padding: '16px',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default ScrollArea;
