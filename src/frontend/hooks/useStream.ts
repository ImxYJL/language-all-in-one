import { useRef, useState } from 'react';

type StreamStatus = 'idle' | 'streaming' | 'success' | 'error';

type StreamCallbacks = {
  /** 스트림에서 새 텍스트 조각(chunk)이 도착할 때마다 호출 */
  onData: (chunk: string) => void;
  onComplete: (headers: Headers) => void;
  onError: (error: Error) => void;
};

/**
 * 스트리밍 API 요청을 처리하는 훅
 */
export const useStream = () => {
  const [status, setStatus] = useState<StreamStatus>('idle');
  const abortControllerRef = useRef<AbortController | null>(null);

  const trigger = async (
    url: string,
    options: RequestInit, // fetch 옵션 (method, body, headers)
    callbacks: StreamCallbacks,
  ) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setStatus('streaming');

    try {
      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      }

      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        // 1. 데이터 청크가 오면 onData 콜백 호출
        callbacks.onData(value);
      }

      // 2. 스트림이 끝나면 onComplete 콜백 호출 (헤더 전달)
      callbacks.onComplete(res.headers);
      setStatus('success');
    } catch (error) {
      console.error('useChatStream error:', error);
      if (error instanceof Error && error.name === 'AbortError') return;

      callbacks.onError(error as Error);
      setStatus('error');
    } finally {
      abortControllerRef.current = null;
    }
  };

  return {
    trigger,
    status,
    isLoading: status === 'streaming',
  };
};
