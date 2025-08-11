'use client';

import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';

type SidebarContextType = {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
};

const SidebarStateContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // NOTE: 추후 로직 분리 혹은 상수화
  useLayoutEffect(() => {
    const isDesktop = window.innerWidth >= 1024; // Tailwind lg 기준
    setIsSidebarOpen(isDesktop);
  }, []);

  // 모바일에서 열렸을 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow =
      !isSidebarOpen && window.innerWidth < 1024 ? '' : window.innerWidth < 1024 ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  const api = useMemo<SidebarContextType>(
    () => ({
      isSidebarOpen,
      openSidebar: () => setIsSidebarOpen(true),
      closeSidebar: () => setIsSidebarOpen(false),
      toggleSidebar: () => setIsSidebarOpen((p) => !p),
    }),
    [isSidebarOpen],
  );

  return (
    <SidebarStateContext.Provider value={api}>
      <div data-sidebar={isSidebarOpen ? 'open' : 'closed'} className="group/sidebar">
        {children}
      </div>
    </SidebarStateContext.Provider>
  );
};

export const useSidebarStateContext = () => {
  const context = useContext(SidebarStateContext);
  if (!context) throw new Error('useSidebarContext must be used within SidebarProvider');
  return context;
};
