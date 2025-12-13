'use client'; //나중에 하이드레이션 ㄱㄱ

import useGetMessages from '@/frontend/queries/chat/useGetMessages';
import ChatMessage from './ChatMessage';

interface ChatListSectionProps {
  conversationId: string;
}

const ChatListSection = ({ conversationId }: ChatListSectionProps) => {
  const { data: messages, isLoading } = useGetMessages(conversationId);

  if (!messages) return null;

  return (
    <section className="space-y-6">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          id={message.id}
          role={message.role}
          content={message.content}
          isLoading={isLoading}
        />
      ))}
    </section>
  );
};

export default ChatListSection;
