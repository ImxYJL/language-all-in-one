import { Overlay } from '@/frontend/components/chat';
import { Header, Sidebar } from '@/frontend/components/common';
import { ChatPageStateProvider, SidebarStateProvider } from '@/frontend/providers';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarStateProvider>
      <ChatPageStateProvider>
        <div className="bg-background flex min-h-dvh">
          <Sidebar />
          <Overlay />
          <main className="flex min-w-0 flex-1 flex-col transition-[margin] duration-300 lg:group-data-[sidebar=closed]/sidebar:ml-0 lg:group-data-[sidebar=open]/sidebar:ml-80">
            <Header />
            {children}
          </main>
        </div>
      </ChatPageStateProvider>
    </SidebarStateProvider>
  );
}
