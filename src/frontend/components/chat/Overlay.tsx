'use client';

import { useSidebarStateContext } from '@/frontend/providers/SidebarStateProvider';

const Overlay = () => {
  const { closeSidebar } = useSidebarStateContext();

  return (
    <div
      onClick={closeSidebar}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 bg-black/40 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-data-[sidebar=open]/sidebar:pointer-events-auto group-data-[sidebar=open]/sidebar:opacity-100 lg:hidden"
    />
  );
};

export default Overlay;
