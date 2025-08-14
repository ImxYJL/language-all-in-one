import { ScrollArea } from '../common';
import ChatListSection from './ChatListSection';
import WelcomeSection from './WelcomeSection';

interface ChatContentProps {
  currentChatId?: number;
}

const ChatContent = ({ currentChatId }: ChatContentProps) => {
  const hasCurrentChat = currentChatId !== undefined;

  return (
    <ScrollArea currentChatId={currentChatId} className="flex-1 p-4">
      <div className="mx-auto max-w-4xl">{hasCurrentChat ? <ChatListSection /> : <WelcomeSection />}</div>
    </ScrollArea>
  );
};

export default ChatContent;
