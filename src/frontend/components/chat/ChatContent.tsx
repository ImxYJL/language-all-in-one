import { ScrollArea } from '../common';
import ChatListSection from './ChatListSection';
import WelcomeSection from './WelcomeSection';

interface ChatContentProps {
  conversationId?: string;
}

const ChatContent = ({ conversationId }: ChatContentProps) => {
  const hasCurrentChat = conversationId !== undefined;

  return (
    <ScrollArea currentChatId={conversationId} className="flex-1 p-4">
      <div className="mx-auto max-w-4xl">
        {hasCurrentChat ? <ChatListSection conversationId={conversationId} /> : <WelcomeSection />}
      </div>
    </ScrollArea>
  );
};

export default ChatContent;
