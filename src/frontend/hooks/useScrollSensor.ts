'use client';

import { useLayoutEffect, useRef, useState } from 'react';

const useScrollSensor = <T extends HTMLElement>() => {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const containerRef = useRef<T | null>(null);

  const scrollToBottom = (smooth = false) => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    containerEl.scrollTo({
      top: containerEl.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  const handleScroll = () => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    // 100px 이상 스크롤을 올린 경우, 아래로 스크롤이 자동으로 이동하는 것을 막음
    const threshold = 100;
    const isNearBottom = containerEl.scrollHeight - containerEl.scrollTop - containerEl.clientHeight < threshold;
    setIsAtBottom(isNearBottom);
  };

  useLayoutEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    containerEl.addEventListener('scroll', handleScroll);
    return () => containerEl.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    containerRef,
    isAtBottom,
    scrollToBottom,
  };
};

export default useScrollSensor;
