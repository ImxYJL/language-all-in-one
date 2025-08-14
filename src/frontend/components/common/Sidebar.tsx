'use client';

import { BookOpen, Calendar, MessageCircle, Plus } from 'lucide-react';
import { Button, NavigationList, NavigationItem, SidebarHeader } from '@/frontend/components/common';
import { ChatList } from '../chat';

const Sidebar = () => {
  return (
    <aside
      id="app-sidebar"
      className="border-border/20 fixed inset-y-0 left-0 z-50 w-80 -translate-x-full border-r bg-gradient-to-b from-white to-gray-50/90 backdrop-blur-sm transition-transform duration-300 ease-in-out will-change-transform group-data-[sidebar=open]/sidebar:translate-x-0 motion-reduce:transition-none"
    >
      <div className="flex h-full flex-col">
        <SidebarHeader />
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

        <div className="flex-1 px-4">
          {/* Navigation Section */}
          <NavigationList title="이동하기">
            <NavigationItem icon={BookOpen} label="오늘의 단어" href="#" />
            <NavigationItem icon={MessageCircle} label="회화 학습 정리본" href="#" />
            <NavigationItem icon={Calendar} label="학습 캘린더" href="#" />
          </NavigationList>

          {/* Chat List Section */}
          <ChatList />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
