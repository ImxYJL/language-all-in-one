import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const PORTAL_CONTAINER_ID = {
  modal: 'portal-modal-root',
  sheet: 'portal-sheet-root',
  toast: 'portal-toast-root',
} as const;

export type PortalContainerKey = keyof typeof PORTAL_CONTAINER_ID;

const ensureContainer = (containerId: string) => {
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return container;
};

/**
 * containerKey: 'modal' | 'sheet' | 'toast'
 * mountEl: 이 훅 인스턴스가 실제로 createPortal로 렌더링할 고유 div
 */
export const usePortal = (containerKey: PortalContainerKey = 'modal') => {
  const mountElRef = useRef<HTMLDivElement | null>(null);
  if (typeof document !== 'undefined' && !mountElRef.current) {
    mountElRef.current = document.createElement('div');
  }

  useEffect(() => {
    if (!mountElRef.current) return;

    const containerId = PORTAL_CONTAINER_ID[containerKey];
    const containerEl = ensureContainer(containerId);

    containerEl.appendChild(mountElRef.current);

    return () => {
      // 자신의 자식 컴포넌트들만 제거
      if (mountElRef.current?.parentElement === containerEl) {
        containerEl.removeChild(mountElRef.current);
      }
      if (containerEl.childElementCount === 0) {
        containerEl.remove();
      }
    };
  }, [containerKey]);

  const Portal: React.FC<React.PropsWithChildren> = ({ children }) => {
    if (typeof document === 'undefined' || !mountElRef.current) return null;

    return createPortal(children, mountElRef.current);
  };

  return { Portal };
};
