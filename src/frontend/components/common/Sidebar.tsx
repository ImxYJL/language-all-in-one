'use client';

import { BookOpen, Calendar, MessageCircle, Plus, X } from 'lucide-react';
import { Button, ScrollArea, NavigationList, NavigationItem } from '@/frontend/components/common';
import { useSidebarStateContext } from '@/frontend/providers/SidebarStateProvider';
import { ChatList } from '../chat';
import clsx from 'clsx';

const Sidebar = () => {
  const { closeSidebar, isSidebarOpen } = useSidebarStateContext();

  return (
    <aside
      id="app-sidebar"
      className={clsx(
        'border-border/20 fixed inset-y-0 left-0 z-50 w-80 border-r',
        'bg-gradient-to-b from-white to-gray-50/90 backdrop-blur-sm',
        'transition-transform duration-300 ease-in-out',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="flex h-full flex-col">
        {/* Sidebar Header */}
        <div className="border-border flex h-14 items-center justify-between border-b p-4">
          <h2 className="font-medium text-gray-800">ChatAI</h2>
          <Button styleType="custom" onClick={closeSidebar} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Button
            styleType="primary"
            className="flex h-10 w-full items-center justify-center transition-all duration-200"
            onClick={() => console.log('create new chat')}
          >
            <Plus className="mr-2 h-4 w-4 text-white" strokeWidth={3} />
            <span>새로운 채팅</span>
          </Button>
        </div>

        <ScrollArea className="flex-1 px-4">
          {/* Navigation Section */}
          <NavigationList title="이동하기">
            <NavigationItem icon={BookOpen} label="오늘의 단어" href="#" />
            <NavigationItem icon={MessageCircle} label="회화 학습 정리본" href="#" />
            <NavigationItem icon={Calendar} label="학습 캘린더" href="#" />
          </NavigationList>

          {/* Chat List Section */}
          <ChatList />
        </ScrollArea>
      </div>
    </aside>
  );
};

export default Sidebar;
