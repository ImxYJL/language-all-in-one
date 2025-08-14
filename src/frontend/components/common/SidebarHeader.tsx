'use client';

import { X } from 'lucide-react';
import Button from './Button';
import { useSidebarStateContext } from '@/frontend/providers/SidebarStateProvider';

const SidebarHeader = () => {
  const { closeSidebar } = useSidebarStateContext();

  return (
    <div className="border-border flex h-14 items-center justify-between border-b p-4">
      <h2 className="font-medium text-gray-800">ChatAI</h2>
      <Button styleType="custom" onClick={closeSidebar} className="text-gray-500 hover:text-gray-700">
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SidebarHeader;
