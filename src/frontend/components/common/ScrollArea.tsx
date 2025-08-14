'use client';

import { useScrollSensor } from '@/frontend/hooks';
import { useEffect } from 'react';

interface ScrollAreaProps {
  currentChatId?: number;
  messages?: string[]; // 추후 변경 가능
  children: React.ReactNode;
  className?: string;
}

const ScrollArea = ({ currentChatId, messages, children, className }: ScrollAreaProps) => {
  const { containerRef, isAtBottom, scrollToBottom } = useScrollSensor<HTMLDivElement>();

  // 새 메시지가 오면 자동 스크롤 (조건으로 message 다는 게 맞는지 확인하기)
  useEffect(() => {
    if (messages && isAtBottom) {
      scrollToBottom(true);
    }
  }, [messages, isAtBottom]);

  // 채팅방 내용이 있으면 하단으로 바로 이동
  useEffect(() => {
    if (messages && messages.length > 0) {
      scrollToBottom(false);
    }
  }, [messages, currentChatId]);

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
