'use client';

import { Menu } from 'lucide-react';
import Button from './Button';
import { useSidebarStateContext } from '@/frontend/providers/SidebarStateProvider';

const SidebarToggleButton = () => {
  const { toggleSidebar, isSidebarOpen } = useSidebarStateContext();

  return (
    <Button styleType="custom" onClick={toggleSidebar} aria-controls="app-sidebar" aria-expanded={isSidebarOpen}>
      <Menu className="h-5 w-5" />
    </Button>
  );
};

export default SidebarToggleButton;
